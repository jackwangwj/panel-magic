import { Inject } from "@angular/core";
import { IndexedDBAngular, IndexDetails } from 'indexeddb-angular'
import { PanelExtendService } from "./panel-extend.service";
import { Subject, Observer, Observable, BehaviorSubject } from "rxjs";
import { AppDataService } from "../appdata/app-data.service";
import { uniqueId } from "@ng-public/util";
import { PanelSeniorVesselEditService } from "./panel-senior-vessel-edit/panel-senior-vessel-edit.service";

export interface IDBData {
	widgetList: string
}

/**
 * 每一个需要存储的集合对象信息
 */
export class MoveBackDBInfoModel {
	// 记录前进和后退的存储集合项的下标key
	public dbCurrentIndex: number = 0;
	// 自增的DBkey
	public dbKey: number = -1
	// 是否允许前进
	public get isMove(): boolean {
		return this.dbCurrentIndex < this.dbKey
	}
	// 是否允许后退
	public get isBack(): boolean {
		return this.dbCurrentIndex > 0
	}
	constructor() {}

}

// 前进和后退的服务
@Inject({
	providedIn: 'root'
})
export class PanelExtendMoveBackService {
	public indexedDB: IDBFactory = window.indexedDB || (<any>window).mozIndexedDB || (<any>window).webkitIndexedDB || (<any>window).msIndexedDB;

	public dbVersion = 1

	/**
	 * 创建一个叫panelDataDB的本地数据库，版本号为2
	 * 用于存储自由面板拓展模式的存储数据
	 */
	public db = new IndexedDBAngular('panelDataDB', this.dbVersion)

	/**
	 * 发射从DB集合里取出来的数据
	 */
	public launchDBDataValue$: Subject<IDBData> = new Subject<IDBData>()

	/**
	 * 当前的前进后退信息集合的值
	 */
	public get currentMoveBackInfoValue() : MoveBackDBInfoModel {
		const _map = this.dbCollectionsMoveBackMap.get(this.currentMoveBackMapKey$.value);
		return _map ? _map : new MoveBackDBInfoModel()
	}

	/**
	 * 创建一个索引表Map，用于在不同页面、不同动态容器之间快速的查询到专属的撤销前进操作并获取到对应的集合数据
	 * 使其在不同页面和不同动态容器之间切换的时候撤销前进数据不会混乱
	 */
	private dbCollectionsMoveBackMap: Map<string, MoveBackDBInfoModel> = new Map();
	// 当前DBCollectionsMap索引的key
	private currentMoveBackMapKey$: BehaviorSubject<string> = new BehaviorSubject<string>('')


	constructor(
		private panelExtendService: PanelExtendService,
		private panelSeniorVesselEditService: PanelSeniorVesselEditService,
		private appDataService: AppDataService
	) {}

	/**
	 * 往dbCollectionsMoveBackMap新增数据对象索引, 创建完之后返回是否创建成功
	 */
	public setMoveBackMap( key: string ): boolean {
		this.currentMoveBackMapKey$.next(key);
		if( !this.dbCollectionsMoveBackMap.has(key) ) {
			this.dbCollectionsMoveBackMap.set(this.currentMoveBackMapKey$.value, new MoveBackDBInfoModel())
			return true
		}else {
			return false
		}
	}

	/**
	 * 创建DB集合
	 */
	public createCollections( key: string ): Observable<boolean> {
		const _sub: Subject<boolean> = new Subject<boolean>()
		if( this.setMoveBackMap(key) ) {
			this.currentMoveBackInfoValue.dbKey = -1;
			if (this.db['dbWrapper']['db'] ) {
				this.db['dbWrapper']['db'].close();
			}
			setTimeout(() => {
				this.db.createStore(this.dbVersion, function (e, db) {
					e.target.result.createObjectStore(key);
				}).then(() => {
					this.dbClear(key)
					this.dbVersion += 1;
					_sub.next(true);
				});
			});
		};
		return _sub.asObservable()
	}

	/**
	 * 往集合里添加数据
	 * 同时把新添加的key赋值给dbCurrentIndex，
	 * 同时赋值给页面的else数据
	 * 如果是从动态容器里添加DB数据则该数据并不保存到appData里
	 */
	public dbAdd(): void {
		const _new_db_key = this.currentMoveBackMapKey$.value;
		if (_new_db_key ) {
			const _is_vessel = this.panelSeniorVesselEditService.isEnterEditVesselCondition$.value;
			this.handleDbCurrentRefreshDB();
			this.currentMoveBackInfoValue.dbKey += 1;
			const _widget_list = this.panelExtendService.handleSaveWidgetToOrientationModelData(this.panelExtendService.valueWidgetList())
			this.db.add(_new_db_key, { widgetList: JSON.stringify(_widget_list) }, this.currentMoveBackInfoValue.dbKey).then(
				_e => {
					if ((<Object>_e).hasOwnProperty('key')) {
						this.currentMoveBackInfoValue.dbCurrentIndex = _e.key
					};
					if ( !_is_vessel ) {
						this.appDataService.currentAppDataForinPageData.eles = _widget_list;
					}
				},
				() => {
					this.currentMoveBackInfoValue.dbKey -= 1
					// 容灾处理
					this.indexedDB.deleteDatabase('panelDataDB')
					// throw new Error('添加组件仓库集合失败');
				}
			)
		}
	}

	/**
	 * 在执行添加数据集操作的时候判断dbCurrentIndex当前指引的下标是否低于dbKey
	 * 如果是说明执行了后退操作之后后续动作执行了dbAdd的操作，则清空dbCurrentIndex索引之后的数据重新添加
	 */
	public handleDbCurrentRefreshDB(): void {
		if (this.currentMoveBackInfoValue.dbCurrentIndex < this.currentMoveBackInfoValue.dbKey) {
			for (let i = this.currentMoveBackInfoValue.dbCurrentIndex + 1; i <= this.currentMoveBackInfoValue.dbKey; i++) {
				this.db.delete(this.currentMoveBackMapKey$.value, i).then(() => {})
			};
			this.currentMoveBackInfoValue.dbKey = this.currentMoveBackInfoValue.dbCurrentIndex
		}
	}

	/**
	 * 执行后退操作发射DB数据集
	 */
	public acquireBackDBData(): void {
		if (this.currentMoveBackInfoValue.isBack ) {
			this.currentMoveBackInfoValue.dbCurrentIndex -= 1
			console.log(this.currentMoveBackMapKey$.value,)
			this.db.getByKey(this.currentMoveBackMapKey$.value, this.currentMoveBackInfoValue.dbCurrentIndex).then(res=>{
				this.launchDBDataValue$.next(res)
			},()=>{ })
		}
	}

	/**
	 * 执行前进操作发射DB数据集
	 */
	public acquireMoveDBData(): void {
		if (this.currentMoveBackInfoValue.isMove ) {
			this.currentMoveBackInfoValue.dbCurrentIndex += 1
			this.db.getByKey(this.currentMoveBackMapKey$.value, this.currentMoveBackInfoValue.dbCurrentIndex).then(res => {
				this.launchDBDataValue$.next(res)
			}, () => { })
		}
	}

	/**
	 * 清除DB集合widgetWarehouse
	 */
	public dbClear(key: string): void {
		this.db.clear(key).then(_e => {})
	}
}

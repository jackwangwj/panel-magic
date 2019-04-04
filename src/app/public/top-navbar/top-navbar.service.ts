import { Injectable } from '@angular/core';
import { Subscriber }	from 'rxjs/Subscriber'
import { Subscription }	from 'rxjs/Subscription'
import { Subject }    from 'rxjs/Subject';
import { Observable }	from 'rxjs/Observable'

import { AppDataService }	from '../../appdata/app-data.service'
import { HsXcxService }	from '../../service'
import { NzMessageService, NzNotificationService }	from 'ng-zorro-antd'

import { HistoricalRecordModel,PublishSiteModel }	from '@ng-public/top-navbar/Model'
import { PanelExtendService } from '../../panel-extend/panel-extend.service';

@Injectable()
export class TopNavbarService {

	// 历史记录的数据模型
	public historicalRecordModel: HistoricalRecordModel = new HistoricalRecordModel()
	// 发布设置的数据模型
	public publishSiteModel: PublishSiteModel = new PublishSiteModel()
	// 自动保存的开关项
	public autoSaveEntity: any
	// 保存按钮的loading效果
	public btnSaveLoading: boolean = false

	constructor(
		private appDataService: AppDataService,
		private hsXcxService: HsXcxService,
		private nzNotificationService: NzNotificationService,
		private panelExtendService: PanelExtendService,
		private nzMessageService: NzMessageService
	) { }

	/**
	 * @author GR-03
	 * @copyright
	 * 开启自动保存功能
	 * 每次执行都重新计时
	 * 默认间隔是5分钟
	 * @param     [param]
	 * @return    [return]
	 */
	public openAutoSave(): void {
		if( this.autoSaveEntity ) clearInterval( this.autoSaveEntity );
		this.autoSaveEntity = setInterval(()=>{
			// this.saveXcxAppData()
		},300000)
	}


	/**
	 * @author GR-03
	 * @copyright 获取历史记录的小程序详情
	 * @param     [param]
	 * @return    [return]
	 * @param     {number}    history_id [description]
	 */
	public restoreAppDataHistroy( history_id: number ): void {
		this.hsXcxService.getAppDataDetail({
			app_id: this.appDataService.appDataModel.app_id,
			history_id: history_id
		}).subscribe(res=>{
			if( res.status === 1 ) {
                this.appDataService.setAppData( res['data'] )
			}
		},error=>{
			throw new Error( error )
		})
	}

	/**
	 * @author GR-03
	 * @copyright 保存小程序
	 * @param     [param]
	 * @return    [return]
	 * @param     {boolean          = false}       is_version [description]
	 * @return    {Observable<boolean>}   [description]
	 */
	public saveXcxAppData( type: 'publish' | '' = '' ): Observable<boolean> {
		let _sub = new Subject<boolean>()
		this.btnSaveLoading = true;
		if (this.appDataService.currentAppDataForinPageData) {
			this.appDataService.currentAppDataForinPageData.eles = this.panelExtendService.handleSaveWidgetToOrientationModelData()
		};
		let _save_fn = ()=>{
			this.hsXcxService.postAppDataSave( {
				...this.appDataService.appDataModel,
				type: type
			} ).subscribe(res=>{
				if( res.status === 1 ) {
					this.openAutoSave()
					this.nzMessageService.create('success', '保存成功')
					_sub.next( true )
					this.btnSaveLoading = false
				}
			},error=>{
				_sub.next( false )
				this.btnSaveLoading = false
				throw new Error( error )
			})
		}
		_save_fn()
		return _sub.asObservable()
	}

	// public saveTemplateAppData(): Observable<boolean> {
	// 	this.resolveFormData()
	// 	let _sub = new Subject<boolean>()
	// 	this.hsXcxService.postAppDataAddTemplate( {
	// 		...this.appDataService.appDataModel
	// 	} ).subscribe(res=>{
	// 		if( res.status === 1 ) {
	// 			this.openAutoSave()
	// 			this.nzMessageService.create( 'success','保存成功' )
	// 			_sub.next( true )
	// 		}
	// 	},error=>{
	// 		_sub.next( false )
	// 		throw new Error( error )
	// 	})
	// 	return _sub.asObservable()
	// }

	/**
	 * @author GR-03
	 * @copyright 获取历史记录的函数
	 * @param     [param]
	 * @return    [return]
	 */
	public fnGetRecordList(): void {
		this.hsXcxService.getAppDataHistory({
			'app_id': this.appDataService.appDataModel.app_id,
			'page': this.historicalRecordModel.page
		}).subscribe(res=>{
			this.historicalRecordModel.isLoading = true
			if( res.status === 1 ) {
				// 当前页面
				this.historicalRecordModel.page = res['data']['current_page']
				this.historicalRecordModel.isLoading = false
				if( res['data']['next_page_url'] ) {
					this.historicalRecordModel.isNext = true
					this.historicalRecordModel.recordList = [...this.historicalRecordModel.recordList,...res['data']['data']]
					this.historicalRecordModel.page++
				}else {
					this.historicalRecordModel.isNext = false
					if( this.historicalRecordModel.page == 1 ) {
						this.historicalRecordModel.recordList = [...res['data']['data']]
					}else {
						this.historicalRecordModel.recordList = [...this.historicalRecordModel.recordList,...res['data']['data']]
					}
				}
			}
		},error=>{
			throw new Error( error )
		})

    }

}

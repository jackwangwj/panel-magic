import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { TransformMatrixModel, TrackModel, SelectionRectModel, PanelInfoModel } from './Model'
import { PanelWidgetModel } from './panel-widget/Model';
import { cloneDeep, get }  from 'lodash'
import { CombinationWidgetModel } from './panel-scope-enchantment/Model';
import { AppDataService } from '../appdata/app-data.service';
import { uniqueId } from '@ng-public/util';
import { PanelSeniorVesselEditService } from './panel-senior-vessel-edit/panel-senior-vessel-edit.service';
import { VesselWidgetModel } from './panel-senior-vessel-edit/Model';
import { WidgetModel } from './panel-widget/Model/WidgetModel';
import { HostItemModel } from './panel-widget/Model/HostModel';
import { OrientationModel } from './panel-widget/Model/OrientationModel';

@Injectable({
  providedIn: 'root'
})
export class PanelExtendService {

	// 执行保存到本地数据库DB操作
	public launchSaveIndexedDB$: Subject<never> = new Subject<never>()
	// 执行记录面板panel的视图位置信息
	public launchRecordPanelInfoRect$: Subject<never> = new Subject<never>()

	// 面板区域的宿主元素
	public panelMainEl: ElementRef

	// 主视图的transform的变换数据模型
	public transformMatrixModel: TransformMatrixModel = new TransformMatrixModel()
	// 中央画板主屏幕的页面信息数据膜 ( 若处于动态容器编辑模式下，则改变其对象数据指引 )
	public panelInfoModel: PanelInfoModel = new PanelInfoModel()
	// 滚动条数据模型
	public trackModel: TrackModel = new TrackModel()
	// 可选区域的矩形数据模型
	public selectionRectModel: SelectionRectModel = new SelectionRectModel()

	// 当前自由面板内的组件列表内容
	public widgetList$: BehaviorSubject<Array<PanelWidgetModel>> = new BehaviorSubject<Array<PanelWidgetModel>>([])

	// 是否允许鼠标拖拽视图
	public isOpenSpacebarMove$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	constructor(
		private ads: AppDataService,
		private panelSeniorVesselEditService: PanelSeniorVesselEditService
	) { }

	/**
	 * 获取zIndex层级的最小值和最大值
	 */
	public findZIndexExtremum(): { min: number, max: number } {
		const _widget_list = this.valueWidgetList();
		let _min = Infinity;
		let _max = -Infinity;
		_widget_list.forEach(_w=>{
			_min = Math.min(_min,_w.profileModel.zIndex);
			_max = Math.max(_max,_w.profileModel.zIndex)
		});
		return { min: _min, max: _max }
	}

	/**
	 * 转化HostItemModel为PanelWidgetModel
	 * 对组合组件特殊转化
	 * 对动态容器组件特殊转化
	 */
	public handleFreeItemToPanelWidget(arr: Array<WidgetModel>): PanelWidgetModel[] {
		if( Array.isArray(arr) ) {
			let _res = [];
			arr.forEach(_e=>{
				let _copy_e = cloneDeep(_e);
				let _widget_e = new PanelWidgetModel(<HostItemModel>{ autoWidget: _copy_e, type: _copy_e.type })
				if (_widget_e.type == 'combination' && Array.isArray(_widget_e.autoWidget.content) ) {
					let _content = []
					_widget_e.autoWidget.content.forEach((_w: WidgetModel)=>{
						let _copy_w = cloneDeep(_w)
						let _widget_w = new PanelWidgetModel(<HostItemModel>{ autoWidget: _copy_w, type: _copy_w.type })
						const _combination_data = new CombinationWidgetModel(_widget_e)
						_combination_data.setData({
							left: _w.orientationmodel.left,
							top: _w.orientationmodel.top,
							width: _w.orientationmodel.width,
							height: _w.orientationmodel.height,
							rotate: _w.orientationmodel.rotate
						})
						_widget_w.profileModel.setData({
							left: _combination_data.left + _widget_e.profileModel.left,
							top: _combination_data.top + _widget_e.profileModel.top,
						})
						_widget_w.profileModel.combinationWidgetData$.next(_combination_data)
						// // 计算子集组件在组合组件里的位置比例
						_widget_w.profileModel.combinationWidgetData$.value.recordInsetProOuterSphereFourProportion()
						_widget_w.profileModel.recordImmobilizationData()
						_content.push(_widget_w)
					});
					_widget_e.autoWidget.content = _content
				} else if (_widget_e.type == 'seniorvessel' && get(_widget_e, 'autoWidget.content.vesselWidget')) {
					_widget_e.autoWidget.content.vesselWidget = new VesselWidgetModel(get(_widget_e, 'autoWidget.content.vesselWidget'))
				};
				_res.push(_widget_e);
			});
			return _res
		}else {
			return []
		}
	}

	/**
	 * 执行保存操作的时候需要处理widget的orientationModel数据，以便映射在appDataModel每一个页面中的else数组
	 */
	public handleSaveWidgetToOrientationModelData(widgetList: Array<PanelWidgetModel> = this.widgetList$.value): Array<WidgetModel>{
		let _save_free_item = []
		if (Array.isArray(widgetList)) {
			widgetList.forEach(_w => {
				_w = cloneDeep(_w)
				if (_w.type == 'combination' && Array.isArray(_w.autoWidget.content)) {
					_w.autoWidget.content = this.handleCombinationChildWidgetList(_w)
				} else if (_w.type == 'seniorvessel' ) {
					_w.autoWidget.orientationmodel.left   = _w.profileModel.left;
					_w.autoWidget.orientationmodel.top 	  = _w.profileModel.top;
					_w.autoWidget.orientationmodel.width  = _w.profileModel.width;
					_w.autoWidget.orientationmodel.height = _w.profileModel.height;
					_w.autoWidget.orientationmodel.rotate = _w.profileModel.rotate;
					_w.autoWidget.orientationmodel.zIndex = _w.profileModel.zIndex;
					_w.autoWidget.customfeature 		  = _w.panelEventHandlerModel.autoWidgetEvent;
					_w.autoWidget.style.data 			  = _w.ultimatelyStyle
				}
				_save_free_item.push(_w.autoWidget)
			});
		};
		return _save_free_item
	}

	/**
	 * 转化组合组件里的子集组件，使其在简易版自由面板能够正确处理数据
	 */
	public handleCombinationChildWidgetList(widget: PanelWidgetModel): Array<HostItemModel> {
		const _child_width = widget.autoWidget.content;
		let _save_free_item = []
		_child_width.forEach((_w: PanelWidgetModel) => {
			_w = cloneDeep(_w)
			if ((<Object>_w).hasOwnProperty('autoWidget') && _w.autoWidget.orientationmodel && _w.profileModel.combinationWidgetData$) {
				const _com_w = _w.profileModel.combinationWidgetData$.value
				_w.autoWidget.orientationmodel.setData(<OrientationModel>{
					left: _com_w.left,
					top: _com_w.top,
					width: _com_w.width,
					height: _com_w.height,
					rotate: _com_w.rotate
				});
				_w.autoWidget.style.data = _w.ultimatelyStyle
			};
			_save_free_item.push(_w.autoWidget)
		});
		return _save_free_item
	}


	/**
	 * 清除无效事件
	 */
	public clearInvalidEvent(): void {
		const _page_obj = this.ads.appDataModel.app_data;
		if( _page_obj ) {
			for( let e in _page_obj ) {
				if (Array.isArray(_page_obj[e].eles) ) {
					_page_obj[e].eles.forEach(_widget=>{
						if (_widget.customfeature && _widget.customfeature.eventHandler == 'tapNavigateHandler' ) {
							let _nav_url = _widget.customfeature.eventParams.nav_url;
							if (!Object.keys(_page_obj).includes(_nav_url) ) {
								_widget.customfeature.eventHandler = ''
								_widget.customfeature.eventParams = null
							}
						}
					})
				}
			};
		}
	}

	/**
	 * 置于顶层或底层
	 * widgets是被选组件widget
	 */
	public handleZIndexTopOrBottom( widgets: Array<PanelWidgetModel>, type: 'top' | 'bottom' ): void {
		if( Array.isArray(widgets) ) {
			const { min, max } = this.findZIndexExtremum();
			const _uniqueid_list = widgets.map(_e=>_e.uniqueId)
			if( type == 'top' ) {
				// 先按照zindex顺序从小排大
				widgets = widgets.sort((a,b)=>a.profileModel.zIndex - b.profileModel.zIndex);
				widgets.forEach((_w,_i)=>{
					_w.profileModel.setData({
						zIndex: max + _i + 1
					});
				});
				this.deletePanelWidget(_uniqueid_list);
				this.nextWidgetList(this.valueWidgetList().concat(widgets))
			}else if( type == 'bottom' ) {
				// 先按照zindex顺序从大排小
				widgets = widgets.sort((a, b) => b.profileModel.zIndex - a.profileModel.zIndex);
				widgets.forEach((_w, _i) => {
					_w.profileModel.setData({
						zIndex: min - _i - 1
					})
				});
				this.deletePanelWidget(_uniqueid_list);
				widgets = widgets.reverse()
				this.nextWidgetList([...widgets, ...this.valueWidgetList()])
			}
		}
	}

	/**
	 * 根据唯一uniqueId删除widget组件
	 */
	public deletePanelWidget(nrId: string | Array<string | number> ): void {
		const _nr_id = Array.isArray(nrId) ? nrId : [nrId];
		const _repet_wid = this.valueWidgetList().filter(_e => !_nr_id.includes(_e.uniqueId))
		this.nextWidgetList(_repet_wid)
		this.launchSaveIndexedDB$.next()
	}

	/**
	 * 添加新的widget组件
	 * 重新设置zindex的值
	 * 每次添加组件之前都记录数据并保存到indexedDB
	 */
	public addPanelWidget( newWidget: Array<PanelWidgetModel> ): void {
		if (Array.isArray(newWidget) ) {
			let _arr = this.valueWidgetList()
			const { max } = this.findZIndexExtremum();
			newWidget.forEach((_w,_i)=>{
				setTimeout(() => (_w.uniqueId = `${uniqueId()}${Math.round(Math.random() * 10000)}`))
				_w.profileModel.setData({
					zIndex: max == -Infinity ? 1 : (max + _i + 1)
				});
				_w.autoWidget.orientationmodel.left 	= _w.profileModel.left;
				_w.autoWidget.orientationmodel.top 		= _w.profileModel.top;
				_w.autoWidget.orientationmodel.width 	= _w.profileModel.width;
				_w.autoWidget.orientationmodel.height 	= _w.profileModel.height;
				_w.autoWidget.orientationmodel.rotate 	= _w.profileModel.rotate;
				_w.autoWidget.orientationmodel.zIndex 	= _w.profileModel.zIndex;
			});
			_arr = _arr.concat(newWidget);
			this.nextWidgetList(_arr)
			setTimeout(() => { this.launchSaveIndexedDB$.next() }, 11 );
		}
	}


	/**
	 * next -> widgetlist数据的统一入口，用于作拦截处理
	 */
	public nextWidgetList(params: PanelWidgetModel[] ): void {
		if (this.panelSeniorVesselEditService.isEnterEditVesselCondition$.value ) {
			this.panelSeniorVesselEditService.riverDiversionWidgetList$.next(params)
		}else {
			this.widgetList$.next(params)
		};
	}

	/**
	 * 获取widgetList$的value值
	 */
	public valueWidgetList(): PanelWidgetModel[] {
		const _is_vessel_mode = this.panelSeniorVesselEditService.isEnterEditVesselCondition$.value;
		return _is_vessel_mode ? this.panelSeniorVesselEditService.riverDiversionWidgetList$.value : this.widgetList$.value
	}


}

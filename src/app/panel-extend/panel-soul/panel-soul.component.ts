import { Component, OnInit, OnDestroy, NgZone, Renderer2, Input } from '@angular/core';
import { PanelSoulService } from './panel-soul.service'
import { PanelExtendService } from '../panel-extend.service';
import { Subscription, BehaviorSubject, fromEvent } from 'rxjs';
import { PanelWidgetModel } from '../panel-widget/Model';
import { cloneDeep }	from 'lodash'
import { panelWidgetFixedContainerLsit } from '../panel-widget/all-widget-container';
import { panelWidgetFixedUnitLsit } from '../panel-widget/all-widget-unit';
import { panelWidgetFixedVesselLsit } from '../panel-widget/all-widget-vessel';
import { PanelSeniorVesselEditService } from '../panel-senior-vessel-edit/panel-senior-vessel-edit.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { seniorVesselWidget } from '../panel-widget/all-widget-vessel/senior-vessel-widget/senior-vessel-widget.data';
import { PanelScaleplateService } from '../panel-scaleplate/panel-scaleplate.service';
import { HostItemModel } from '../panel-widget/Model/HostModel';

@Component({
	selector: 'app-panel-soul',
	templateUrl: './panel-soul.component.html',
	styleUrls: ['./panel-soul.component.scss']
})
export class PanelSoulComponent implements OnInit, OnDestroy {
	// 是否显示快捷键的弹窗
	public isShowQuickModal: boolean = false
	// 是否显示新建动态容器的弹窗
	public isVisiableNewVesselModal: boolean = false
	// 订阅是否进入到动态容器编辑模式
	private isEnterVesselEditRX$: Subscription
	private insetWidgetProfileRX$: Subscription
	// 当前激活的tabs选项卡面板
	public currentTabsIndex: number = 0;

	public get fixedWidgetList(): Array<HostItemModel> {
		return this.panelSoulService.fixedWidget$.value
	}

	public get fixedWidgetUnitList(): Array<HostItemModel> {
		return this.panelSoulService.fixedWidgetUnit$.value
	}

	public get fixedWidgetVesselList(): Array<HostItemModel> {
		return this.panelSoulService.fixedWidgetVessel$.value
	}

	public get awaitWidgetVessel$(): BehaviorSubject<PanelWidgetModel> {
		return this.panelSoulService.awaitWidgetVessel$
	}

	public get isEnterEditVesselCondition() : boolean {
		return this.panelSeniorVesselEditService.isEnterEditVesselCondition$.value
	}
	public get validateVesselForm() : FormGroup {
		return this.panelSoulService.validateVesselForm
	}


	constructor(
		private panelExtendService: PanelExtendService,
		private panelSeniorVesselEditService: PanelSeniorVesselEditService,
		private panelScaleplateService: PanelScaleplateService,
		private zone: NgZone,
		private panelSoulService: PanelSoulService
	) {
		this.panelSoulService.fixedWidget$.next(panelWidgetFixedContainerLsit)
		this.panelSoulService.fixedWidgetUnit$.next(panelWidgetFixedUnitLsit)
		this.panelSoulService.fixedWidgetVessel$.next(panelWidgetFixedVesselLsit);

		this.isEnterVesselEditRX$ = this.panelSeniorVesselEditService.isEnterEditVesselCondition$.subscribe(b=>{
			if( b ) {
				this.currentTabsIndex = 0;
			}
		})
	}

	ngOnInit() {}

	ngOnDestroy() {
		if (this.insetWidgetProfileRX$) this.insetWidgetProfileRX$.unsubscribe();
		if (this.isEnterVesselEditRX$) this.isEnterVesselEditRX$.unsubscribe()
	}

	/**
	 * 接收组件库的某组件鼠标按下的事件
	 */
	public acceptWidgetDown(event: MouseEvent, widget: HostItemModel): void {
		let _moveRX$: Subscription
		let _upRX$: Subscription
		_moveRX$ = fromEvent(document, 'mousemove').subscribe((moveE: MouseEvent) => {
			this.zone.run(() => {
				if (!this.awaitWidgetVessel$.value) {
					// 设置初始值
					const _panel = new PanelWidgetModel(cloneDeep(widget))
					this.awaitWidgetVessel$.next(_panel)
				} else {
					const _await = this.awaitWidgetVessel$.value.profileModel
					_await.setData({
						left: moveE.pageX - _await.width / 2,
						top: moveE.pageY - _await.height / 2
					})
				}
			})
		});
		_upRX$ = fromEvent(document, 'mouseup').subscribe((upE: MouseEvent) => {
			this.zone.run(() => {
				if (_moveRX$) _moveRX$.unsubscribe();
				if (_upRX$) _upRX$.unsubscribe();
				const _panel_el: Element = document.querySelector( '#panel-extend-main' )
				if (_panel_el && this.awaitWidgetVessel$.value) {
					const _panel_main_rect = _panel_el.getBoundingClientRect()
					const _await_widget = this.awaitWidgetVessel$.value
					const _panel_mobile = this.panelExtendService.panelInfoModel
					if (
						_await_widget.profileModel.left > _panel_main_rect.left &&
						_await_widget.profileModel.top > _panel_main_rect.top &&
						_await_widget.profileModel.left < _panel_main_rect.left + _panel_main_rect.width &&
						_await_widget.profileModel.top < _panel_main_rect.top + _panel_main_rect.height
					) {
						// 代表该组件已在移动屏内，根据全局的位置设置屏幕的位置
						_await_widget.profileModel.setData({
							left: _await_widget.profileModel.left - _panel_mobile.left,
							top: _await_widget.profileModel.top - _panel_mobile.top
						});
						this.panelExtendService.addPanelWidget([_await_widget]);
					}
				}
				this.awaitWidgetVessel$.next(null)
			})
		})
	};

	/**
	 * 点击快捷键的图标显示弹窗
	 */
	public acceptQuickShortcuts(): void {
		this.isShowQuickModal = true
	}

	/**
	 * 关闭新建动态容器的弹窗
	 */
	public acceptVesselCloseModal(): void {
		this.isVisiableNewVesselModal = false;
		this.validateVesselForm.reset({
			width: 414,
			height: 200
		})
	}


	/**
	 * 显示动态容器添加弹窗
	 */
	public addNewVesselWidget(): void {
		this.isVisiableNewVesselModal = true
	}

	/**
	 * 确认添加动态容器
	 */
	public acceptVesselOk(): void {
		const _get_value = (e: string): any => { return this.validateVesselForm.get(e).value }
		for (let e in this.validateVesselForm.controls) {
			this.validateVesselForm.controls[e].markAsDirty()
			this.validateVesselForm.controls[e].updateValueAndValidity();
		};
		if ( this.validateVesselForm.valid ) {
			const _widget = cloneDeep(seniorVesselWidget);
			// 先修改名称
			_widget.name = _get_value('name');
			_widget.autoWidget.content.vesselWidget.name = _widget.name;
			// 再修改宽高
			_widget.profileModel.setData({
				left: 0,
				top: 0,
				height: _get_value('height'),
				width: _get_value('width')
			});
			this.panelExtendService.addPanelWidget([_widget]);
			this.acceptVesselCloseModal();
			this.panelSeniorVesselEditService.openEditVesselRoom(_widget);
			// 重置回到原点
			this.panelScaleplateService.launchOrigin$.next();
		}
	}

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { PanelEventService } from '../panel-event.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { PanelWidgetModel } from '../../panel-widget/Model';
import { PanelScopeEnchantmentService } from '../../panel-scope-enchantment/panel-scope-enchantment.service';
import { TapToXcxHandler } from '../EventHandler';
import { AppDataService } from '../../../appdata/app-data.service';
import { EnumEventHandler } from '../Model';

@Component({
	selector: 'app-tap-to-xcx-handler',
	templateUrl: './tap-to-xcx-handler.component.html',
	styleUrls: ['./tap-to-xcx-handler.component.scss']
})
export class TapToXcxHandlerComponent implements OnInit, OnDestroy {

	private isShowEventSite$: Subscription
	private tabsetIndexChangeRX$: Subscription

	// 是否跳转至当前小程序
	public isGoToCurrentXcx: boolean = false
	public currentTapToXcxHandler: TapToXcxHandler = new TapToXcxHandler()

	constructor(
		private panelEventService: PanelEventService,
		private appDataService: AppDataService,
		private panelScopeEnchantmentService: PanelScopeEnchantmentService
	) {
		this.isShowEventSite$ = this.panelEventService.eventSiteModel.isVisibleModal$.subscribe(b => {
			if (b == true) {
				const _inset_widget = panelEventService.currentPanelWidgetModel
				if (_inset_widget) {
					const _auto_event = _inset_widget.panelEventHandlerModel;
					if (_auto_event && _auto_event.eventHandler == 'tapToXcxHandler') {
						this.panelEventService.launchCurrentEventIndex$.next(EnumEventHandler[_auto_event.eventHandler]);
						this.currentTapToXcxHandler.xcxAppid = _auto_event.eventParams.xcx_appid
						this.currentTapToXcxHandler.xcxPageUrl = _auto_event.eventParams.xcx_page_url
						this.acceptAppIdChange()
					}
				}
			}else {
				this.currentTapToXcxHandler = new TapToXcxHandler()
			}
		});
		this.tabsetIndexChangeRX$ = this.panelEventService.launchCurrentEventIndex$.subscribe((value: number) => {
			if (EnumEventHandler[value] == 'tapToXcxHandler') {
				this.panelEventService.eventSiteModel.currentEventModel$.next(this.currentTapToXcxHandler)
			}
		})
	}

	ngOnInit() {}
	ngOnDestroy() {
		if (this.isShowEventSite$) this.isShowEventSite$.unsubscribe()
		if( this.tabsetIndexChangeRX$ ) this.tabsetIndexChangeRX$.unsubscribe()
	}


	/**
	 * 点击是否跳转至当前小程序的回调
	 */
	public acceptIsGoToCurrentXcxChange( b: boolean ): void {
		if( b == true ) {
			this.currentTapToXcxHandler.xcxAppid = this.appDataService.appDataModel.app_id;
		}else {
			this.currentTapToXcxHandler.xcxAppid = ''
		}
	}

	/**
	 * 接收appid值的变化
	 */
	public acceptAppIdChange( id: string = this.currentTapToXcxHandler.xcxAppid ): void {
		if( id == this.appDataService.appDataModel.app_id && id != '' ) {
			this.isGoToCurrentXcx  = true
		}else {
			this.isGoToCurrentXcx = false
		}
	}


}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { PanelScopeEnchantmentService } from '../../panel-scope-enchantment/panel-scope-enchantment.service';
import { PanelWidgetModel } from '../../panel-widget/Model';
import { TapCallHandler } from '../EventHandler';
import { PanelEventService } from '../panel-event.service';
import { EnumEventHandler } from '../Model';

@Component({
	selector: 'app-tap-call-handler',
	templateUrl: './tap-call-handler.component.html',
	styleUrls: ['./tap-call-handler.component.scss']
})
export class TapCallHandlerComponent implements OnInit, OnDestroy {
	private isShowEventSite$: Subscription
	private tabsetIndexChangeRX$: Subscription

	// 拨打电话号码的数据模型
	public currentTapCallHandler: TapCallHandler = new TapCallHandler()

	constructor(
		private panelEventService: PanelEventService
	) {
		this.isShowEventSite$ = this.panelEventService.eventSiteModel.isVisibleModal$.subscribe(b => {
			if( b == true ) {
				const _inset_widget = this.panelEventService.currentPanelWidgetModel
				if (_inset_widget) {
					// 如果链接是拨打电话则显示电话号码
					const _auto_event = _inset_widget.panelEventHandlerModel;
					if (_auto_event && _auto_event.eventHandler == 'tapCallHandler') {
						this.panelEventService.launchCurrentEventIndex$.next(EnumEventHandler[_auto_event.eventHandler]);
						this.currentTapCallHandler.setPhoneNum(_auto_event.eventParams.phone_num)
					}
				}
			}else {
				this.currentTapCallHandler = new TapCallHandler()
			}
		});
		this.tabsetIndexChangeRX$ = this.panelEventService.launchCurrentEventIndex$.subscribe((value: number)=>{
			if (EnumEventHandler[value] == 'tapCallHandler' ) {
				this.panelEventService.eventSiteModel.currentEventModel$.next(this.currentTapCallHandler)
			}
		})
	}

	ngOnInit() {}
	ngOnDestroy() {
		if (this.isShowEventSite$) this.isShowEventSite$.unsubscribe()
		if( this.tabsetIndexChangeRX$ ) this.tabsetIndexChangeRX$.unsubscribe()
	}

}

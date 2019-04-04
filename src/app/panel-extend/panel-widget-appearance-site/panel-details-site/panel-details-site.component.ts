import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PanelWidgetModel } from '../../panel-widget/Model';
import { PanelWidgetAppearanceService } from '../../panel-widget-appearance/panel-widget-appearance.service';
import { PanelScopeEnchantmentService } from '../../panel-scope-enchantment/panel-scope-enchantment.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-panel-details-site',
	template: ``,
	styleUrls: ['../ant-collapse.scss']
})
export class PanelDetailsSiteComponent implements OnInit, OnDestroy {
	private profileOutershpere$: Subscription
	@Input()
	public widget: PanelWidgetModel

	constructor(
		private panelWidgetAppearanceService: PanelWidgetAppearanceService,
		private panelScopeEnchantmentService: PanelScopeEnchantmentService
	) {
		this.profileOutershpere$ = this.panelScopeEnchantmentService.scopeEnchantmentModel.outerSphereInsetWidgetList$.subscribe(
			value => {
				if (Array.isArray(value) && value.length == 1 && value.find(_w => _w.type == 'details') && this.panelScopeEnchantmentService.scopeEnchantmentModel.valueProfileOuterSphere) {
					Promise.resolve(null).then(() => {
						this.panelScopeEnchantmentService.scopeEnchantmentModel.valueProfileOuterSphere.isRotate = false
						this.panelScopeEnchantmentService.scopeEnchantmentModel.emptyAllCornerPinList()
					})
				}
			}
		)
	}

	ngOnInit() {}

	ngOnDestroy() {
		if (this.profileOutershpere$) this.profileOutershpere$.unsubscribe()
	}

	ngAfterContentInit() {
		Promise.resolve(null).then(() => {
			this.panelWidgetAppearanceService.isOpenAnimation$.next(false)
			this.panelWidgetAppearanceService.isOpenRotate$.next(false)
			this.panelWidgetAppearanceService.isOpenOpacity$.next(false)
			this.panelWidgetAppearanceService.isOpenWidth$.next(false)
			this.panelWidgetAppearanceService.isOpenHeight$.next(false)
		})
	}

}

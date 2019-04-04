import { Component, OnInit, Input, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { PanelWidgetModel } from '../../panel-widget/Model';
import { PanelWidgetAppearanceService } from '../../panel-widget-appearance/panel-widget-appearance.service';
import { PanelScopeEnchantmentService } from '../../panel-scope-enchantment/panel-scope-enchantment.service';

@Component({
	selector: 'app-panel-linkrange-site',
	template: ``,
	styles: [``]
})
export class PanelLinkrangeSiteComponent implements OnInit, AfterContentInit {
	@Input()
	public widget: PanelWidgetModel

	constructor(
		private panelWidgetAppearanceService: PanelWidgetAppearanceService,
		private panelScopeEnchantmentService: PanelScopeEnchantmentService
	) {
	}

	ngOnInit() {}

	ngAfterContentInit() {
		Promise.resolve(null).then(() => {
			this.panelScopeEnchantmentService.scopeEnchantmentModel.valueProfileOuterSphere.isRotate = false
			this.panelWidgetAppearanceService.isOpenAnimation$.next(false)
			this.panelWidgetAppearanceService.isOpenRotate$.next(false)
			this.panelWidgetAppearanceService.isOpenOpacity$.next(false)

		})
	}
}

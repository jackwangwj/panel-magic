import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { PanelWidgetDetailsSiteComponent } from './panel-widget-details.component'
import { PanelWidgetDetailsSiteService } from './panel-widget-details.service';

import { DraggableModule } from '@ng-public/directive/draggable/draggable.module'

import { MyColorPickerModule } from '@ng-public/my-color-picker/my-color-picker.module'
import { MousemoveoutModule } from '@ng-public/directive/mousemoveout/mousemoveout.module'
import { DragulaModule } from "ng2-dragula";
import { NgxAmapModule, AmapAutocompleteService } from 'ngx-amap';


import { panelWidgetUnitSiteList, panelWidgetUnitSiteModuleList } from '../panel-widget/all-widget-unit';
import { ShareModule } from '@ng-share';
import { environment } from 'environments/environment';

@NgModule({
	imports: [
		CommonModule,
		ShareModule,
		DraggableModule,
		MyColorPickerModule,
		MousemoveoutModule,
		DragulaModule,
		NgxAmapModule.forRoot({ apiKey: environment.mapApiKey }),
		...panelWidgetUnitSiteModuleList
	],
	exports: [PanelWidgetDetailsSiteComponent],
	providers: [PanelWidgetDetailsSiteService, AmapAutocompleteService],
	entryComponents: [...panelWidgetUnitSiteList],
	declarations: [PanelWidgetDetailsSiteComponent, ...panelWidgetUnitSiteList]
})
export class PanelWidgetDetailsSiteModule {}

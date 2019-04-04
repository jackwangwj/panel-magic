import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PanelEventComponent } from './panel-event.component'
import { PanelEventService } from './panel-event.service'
import { TapCallHandlerComponent } from './tap-call-handler/tap-call-handler.component'
import { TapNavigateHandlerComponent } from './tap-navigate-handler/tap-navigate-handler.component'
import { TapToXcxHandlerComponent } from './tap-to-xcx-handler/tap-to-xcx-handler.component'
import { PanelEventCurrentInfoComponent } from './panel-event-current-info/panel-event-current-info.component'
import { TapVesselToStatusHandlerComponent } from './tap-vessel-to-status-handler/tap-vessel-to-status-handler.component'
import { ShareModule } from '@ng-share'
import { TapFeaturesHandlerModule } from './tap-features-handler/tap-features-handler.module'
import { TapDetailHandlerModule } from './tap-detail-handler/tap-detail-handler.module'
import { LinkMenuTriggerComponent } from './link-menu-trigger/link-menu-trigger.component'

@NgModule({
	imports: [
		CommonModule,
		ShareModule,
		TapFeaturesHandlerModule,
		TapDetailHandlerModule
	],
	providers: [PanelEventService],
	exports: [PanelEventComponent, LinkMenuTriggerComponent],
	declarations: [
		PanelEventComponent,
		TapCallHandlerComponent,
		TapNavigateHandlerComponent,
		TapToXcxHandlerComponent,
		PanelEventCurrentInfoComponent,
		TapVesselToStatusHandlerComponent,
		LinkMenuTriggerComponent
	]
})
export class PanelEventModule {}

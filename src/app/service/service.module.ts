import { NgModule, ModuleWithProviders }    from '@angular/core';
import { CommonModule }                    	from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule }                   	from '@angular/router';

import { HsXcxService }						from './hs-xcx/hs-xcx.service'
import { HsXcxCanActivate }					from './hs-xcx/hs-xcx.activate.service'
import { HsDetailsService }					from './hs-details/hs-details.service'
import { HsFileService }					from './hs-files/hs-file.service'

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: []
})
export class ServicesModule {

	static forRoot(): ModuleWithProviders {
		return <ModuleWithProviders> {
			ngModule: ServicesModule,
			providers: [
				HsXcxService,
				HsXcxCanActivate,
				HsDetailsService,
				HsFileService
			],
		};
	}

}

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { CoreModule } from '@ng-core'
import { NgModule, ErrorHandler, Injector } from '@angular/core'
import { CookieModule } from 'ngx-cookie'

import { AppService } from './app.service'

import { HomeComponent } from './aHome.component'
import { AppComponent } from './app.component'
import { TopNavbarModule } from '@ng-public/top-navbar/top-navbar.module'
import { PanelExtendModule } from './panel-extend/panel-extend.module'

import { AppRoutes } from './app.routes'

// 接口请求服务
import { ServicesModule } from './service/service.module'

// 选择图片模块
import { ImageGalleryModule } from '@ng-public/image-gallery/image-gallery.module'

// 最终生成的应用数据服务与模型
import { AppDataService } from './appdata/app-data.service'

// 全局服务;
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'

registerLocaleData(zh)
import { DirectiveService } from '@ng-public/directive/directive.service'

import { environment } from 'environments/environment';

@NgModule({
	declarations: [AppComponent, HomeComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		TopNavbarModule,
		ImageGalleryModule,
		PanelExtendModule,
		CoreModule,
		CookieModule.forRoot(),
		ServicesModule.forRoot(),
		RouterModule.forRoot(AppRoutes, { useHash: true })
	],
	providers: [
		AppService,
		DirectiveService,
		AppDataService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

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

// fundebug配置
// import * as fundebug from 'fundebug-javascript'
import { environment } from 'environments/environment';
// fundebug.apikey = '7a4a21764ac55d4137289e1daf819de319d413bd6464473ef7c5bfe6d9605c5f'

// 定义FundebugErrorHandler
// export class FundebugErrorHandler implements ErrorHandler {
// 	handleError(err: any): void {
// 		fundebug.notifyError(err)
// 	}
// };

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
		AppDataService,
		// {
		// 	provide: ErrorHandler,
		// 	useFactory: (injector: Injector) => {
		// 		if (environment.production) {
		// 			return new FundebugErrorHandler()
		// 		} else {
		// 			return new ErrorHandler()
		// 		}
		// 	},
		// 	deps: [Injector]
		// }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

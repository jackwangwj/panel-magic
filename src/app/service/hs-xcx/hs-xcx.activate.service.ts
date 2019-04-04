import { Injectable,Inject } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { MockModel } from './MockModel'

import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    ActivatedRoute
} from '@angular/router'

import { NzNotificationService } from 'ng-zorro-antd'

import { AppDataService }    from '../../appdata/app-data.service'
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class HsXcxCanActivate implements CanActivate {

    constructor(
        private router:Router,
        private nzNotificationService: NzNotificationService,
        private appDataService: AppDataService
    ) {}

    /**
     * 小程序详情守卫
     * @param route
     * @param state
     * @author GR-05
     */
	canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
		let _app_id = route.params.id
        this.appDataService.appDataModel.app_id = _app_id;
        if( _app_id == undefined ) {
            this.nzNotificationService.create('error','请求错误','请输入正确的appID')
			// 2秒后跳转到 console
			this.delayGoToXcx()
            return false
        }else {
			setTimeout(() => {
				this.appDataService.setAppData(MockModel)
			}, 2000)
			return true
        }
	}

	/**
	 * 几秒后跳转到小程序
	 */
	public delayGoToXcx( delay: number = 2000 ): void {
		if( environment.isJumpXny ) {
			setTimeout(() => {
				document.location.href = `${environment.xnyurl}`
			}, delay)
		}
	}

}

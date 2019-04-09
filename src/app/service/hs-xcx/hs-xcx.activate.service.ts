import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { MockModel } from './MockModel'

import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router} from '@angular/router'

import { NzNotificationService } from 'ng-zorro-antd'

import { AppDataService }    from '../../appdata/app-data.service'

@Injectable()
export class HsXcxCanActivate implements CanActivate {

    constructor(
        private nzNotificationService: NzNotificationService,
        private appDataService: AppDataService
    ) {}

    /**
     * 页面内容详情守卫
     * @param route
     * @param state
     * @author GR-05
     */
	canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
		let _app_id = route.params.id
        this.appDataService.appDataModel.app_id = _app_id;
        if( _app_id == undefined ) {
            this.nzNotificationService.create('error','请求错误','请输入正确的appID')
            return false
        }else {
			setTimeout(() => {
				this.appDataService.setAppData(MockModel)
			}, 2000)
			return true
        }
	}

}

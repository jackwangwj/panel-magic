import { Injectable, Injector } from '@angular/core'

import { UserInfoService } from '../user-info'
import { NzNotificationService } from 'ng-zorro-antd';
import { environment } from 'environments/environment';

/**
 * app 初始化前身份验证操作
 */
@Injectable({
	providedIn: 'root'
})
export class AppInitAuthService {
	constructor(
		private userInfoService: UserInfoService,
		private injector: Injector
	) {}

	/** 验证当前token身份 */
	tokenAuth(): Promise<any> {
		return new Promise((resolve, reject) => {
			resolve(true)
			// this.userInfoService.getUserInfoServer().subscribe(res => {
			// 	if (res.reasonCode == 'notLoggedIn') {
			// 		//测试中，先开启
			// 		if (environment.production) {
			// 			this.goToLogin()
			// 			resolve(false)
			// 		} else {
			// 			resolve(true)
			// 		}
			// 	} else {
			// 		this.userInfoService.userInfo$.next(res.data)
			// 		resolve(true)
			// 	}
			// },()=>{
			// 	if( environment.production ) {
			// 		this.goToLogin()
			// 		resolve(false)
			// 	}else {
			// 		resolve(true)
			// 	}
			// })
		})
	};


	/**
	 * 未登陆前往登陆
	 */
	public goToLogin(): void {
		if( environment.isJumpXny ) {
			this.injector.get(NzNotificationService).error('提示', '您还未登陆，请前往登陆')
			setTimeout(() => {
				document.location.href = `${environment.xnyurl}`
			}, 2000)
		}
	}
}

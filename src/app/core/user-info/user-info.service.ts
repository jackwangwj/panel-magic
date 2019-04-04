import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from "rxjs";

import { UserInfoModel } from "./model/user-info.model";
import { HttpSealService, HttpSealData, IBackHand } from '@ng-http'


@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
    //用户数据 全局共享 数据流
    userInfo$: BehaviorSubject<UserInfoModel> = new BehaviorSubject<UserInfoModel>(new UserInfoModel());

    // 获取用户信息接口api
    currentUser_api: string = this.httpSealData.commonHost + 'api/console/current_user'
    //登出接口
    currentUserLogout_api: string = this.httpSealData.commonHostXNY + 'logout'

    constructor(
        private httpSealData: HttpSealData,
        private httpClient: HttpClient,
        private httpSealService: HttpSealService
    ) { }

	/**
	 * 获取用户数据
	 */
    getUserInfoServer(): Observable<IBackHand<any>> {
        return this.httpClient.get<IBackHand<any>>(this.currentUser_api)
    }


	/**
	 * 退出登录
	 */
    getUserLogoutServer(): Observable<IBackHand<any>> {
        return this.httpClient.get<IBackHand<any>>(this.currentUserLogout_api)
    }
}


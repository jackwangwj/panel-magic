import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject }	from 'rxjs/BehaviorSubject'
import { ActivatedRoute } from '@angular/router';

import { AppService } from '../../app.service'
import { HttpClient } from '@angular/common/http';
import { HttpSealService, HttpSealData, IBackHand } from '@ng-http';

@Injectable()
export class HsXcxService {

	// 根据路由判断是否是模板，是的话则修改所有的接口地址
	public isTemplate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false )

	// 保存为模板
	private postAppDataAddTemplateURL   = this.httpSealData.commonHost + 'api/AppData/template/save';
	// 保存小程序
	private postAppDataSaveURL 			= this.httpSealData.commonHost + 'api/AppData/save';

	// 历史记录
	private getAppDataHistoryURL 		= this.httpSealData.commonHost + 'api/AppData/history';
	// 小程序是否已经被授权
	private getXcxAuthStatusURL 		= this.httpSealData.commonHost + 'api/weixin/check_auth_status';
	// 获取小程序详情
	private getAppDataDetailURL 		= this.httpSealData.commonHost + 'api/AppData/detail';
	// 获取模板详情
	private getAppDataTemplateDetailURL = this.httpSealData.commonHost + 'api/AppData/template/detail';
	// 获取单页面模板列表(默认全部)
	private getTemplateAllListURL	    = this.httpSealData.commonHost + 'api/AppData/template/template_info';
	// 获取模板标签列表
	private getTemplateTagListURL	    = this.httpSealData.commonHost + 'api/AppData/template/get_tag_list';

	constructor(
		private httpSealData: HttpSealData,
		private httpSealService: HttpSealService,
		private httpClient: HttpClient,
	) { }

	/**
	 * 保存小程序
	 */
	public postAppDataSave( param: any ): Observable<any> {
		return this.httpClient.post<IBackHand<any>>(this.postAppDataSaveURL, param)
	}

	/**
	 * 保存为模板
	 */
	public postAppDataAddTemplate( param: any ): Observable<any> {
		return this.httpClient.post<IBackHand<any>>(this.postAppDataAddTemplateURL, param)
	}

	/**
	 * 历史记录
	 */
	public getAppDataHistory( param: any ): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getAppDataHistoryURL, {
			params: this.httpSealService.getParam(param)
		})
	}

	/**
	 * 小程序的详情
	 */
	public getAppDataDetail( param: any ): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getAppDataDetailURL, {
			params: this.httpSealService.getParam(param)
		})
	}

	/**
	 * 获取模板的详情，参数和小程序的详情一致
	 */
	public getAppDataTemplateDetail( param: any ): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getAppDataTemplateDetailURL, {
			params: this.httpSealService.getParam(param)
		})
	}

	/**
	 * 获取小程序授权状态
	 */
	public getXcxAuthStatus( param: any ): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getXcxAuthStatusURL, {
			params: this.httpSealService.getParam(param)
		})
	}

	/**
	 * 获取全部的单页面模板列表
	 */
	public getTemplateList( param: any ): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getTemplateAllListURL, {
			params: this.httpSealService.getParam(param)
		})
	}

	/**
	 * 获取模板标签
	 */
	public getTemplateTagList( param: any = {} ): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getTemplateTagListURL, {
			params: this.httpSealService.getParam(param)
		})
	}

}

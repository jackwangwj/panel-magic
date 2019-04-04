import { Injectable, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { AppDataService }	from '../../appdata/app-data.service'
import { HttpSealData, HttpSealService, IBackHand } from '@ng-http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HsDetailsService {

	// 模型列表
	private getModelListURL = this.httpSealData.commonHost + `api/model/list?app_id=${this.ads.appDataModel.app_id}`;
	// 内容列表
	private getProductListURL = this.httpSealData.commonHost + `api/posts/list?app_id=${this.ads.appDataModel.app_id}`;
	// 分类列表
	private getCategoryListURL = this.httpSealData.commonHost + `api/category/list?app_id=${this.ads.appDataModel.app_id}`;

	// 获取产品列表
	private getProductHandlerListURL = this.httpSealData.commonHost + `api/posts/product_list?app_id=${this.ads.appDataModel.app_id}`;

	// 获取内容详情
	private getDetailInfoURL = this.httpSealData.commonHost + `api/admin/posts/detail?app_id=${this.ads.appDataModel.app_id}`;

	constructor(
		private httpSealData: HttpSealData,
		private httpSealService: HttpSealService,
		private httpClient: HttpClient,
		private ads: AppDataService
	) { }

	/**
	 * 模型列表
	 */
	public getModelList( param: any = {} ): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getModelListURL, {
			params: this.httpSealService.getParam(param)
		})
	}

	/**
	 * 内容列表
	 */
	public getProductList( param: any ): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getProductListURL, {
			params: this.httpSealService.getParam(param)
		})
	}

	/**
	 * 分类列表
	 */
	public getCategoryList( param: any ): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getCategoryListURL, {
			params: this.httpSealService.getParam(param)
		})
	}

	public getProductHandlerList(param: any): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getProductHandlerListURL, {
			params: this.httpSealService.getParam(param)
		})
	}

	public getDetailInfo(param: any): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getDetailInfoURL, {
			params: this.httpSealService.getParam(param)
		})
	}
}

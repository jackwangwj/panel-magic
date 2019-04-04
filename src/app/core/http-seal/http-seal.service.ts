import { HttpParams, HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class HttpSealService {
	constructor(private httpClient: HttpClient) {}

	/**
	 * 转化get参数
	 * @param param
	 */
	getParam(param: any): HttpParams {
		let params = new HttpParams()
		Object.keys(param).forEach(key => {
			params = params.set(key, param[key])
		})
		return params
	}
}

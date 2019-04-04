import { Injectable } from '@angular/core'
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpSealData {

    //api 统一接口 地址
    commonHost: string
    //文件资源 统一 地址
    fileHost: string

    commonHostXNY: string

    constructor() {
		this.commonHost = environment.siteurl
		this.fileHost = environment.fileurl
		this.commonHostXNY = environment.xnyurl
    }
}

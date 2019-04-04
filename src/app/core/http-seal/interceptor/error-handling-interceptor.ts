import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, mergeMap, tap } from "rxjs/operators";
import { cloneDeep } from 'lodash'

import { NzNotificationService } from "ng-zorro-antd";

import { IBackHand } from "../interface";
import { HttpSealData } from "../http-seal.data";
import { environment } from "environments/environment";

//拦截器 - 错误处理
@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

    private _noLoginMsgShow: boolean

    /** 跳过错误处理的标示 */
    private _skipKey:string = 'SKIP_ERROR_HANDLE'

    constructor(
        private nzNotificationService: NzNotificationService,
        private httpSealData: HttpSealData
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let newReq = this.isSkipErrorHandle(req)
        if(!newReq){
            return next.handle(req).pipe(
                tap(res => {
					console.log(res,'tap')
                    if (res instanceof HttpResponse) {
                        this.handleBackHandErr(res);
                    }
                }),
                catchError((err: HttpErrorResponse) => {
					console.log(err, 'err')
                    return this.handleError(err)
                })
            )
        }else{
            return next.handle(newReq as HttpRequest<any>)
        }
    }

    /**
     * 通过参数判断是否需要执行错误拦截
     * @author GR-05
     * @param req 请求体数据
     */
    isSkipErrorHandle(req: HttpRequest<any>): boolean | HttpRequest<any> {
        if (req.method == 'GET' && req.params.has(this._skipKey)) {
            return req.clone({
                params:req.params.delete(this._skipKey)
            })
        } else if (req.method == 'POST' && (<Object>req.body).hasOwnProperty(this._skipKey)) {
            let tempBody = cloneDeep(req.body)
            let newBody = {}
            Object.keys(tempBody).filter(key => key != this._skipKey).forEach(key => {
                newBody[key] = tempBody[key]
            })
            req = req.clone({
                body: newBody
            })
            return req
        }
        return false
    }

	/**
	 * 统一错误处理
	 * 后端自定 错误 而非 http 错误
	 * @param httpResponse
	 */
    handleBackHandErr(httpResponse: HttpResponse<IBackHand<any>>) {
        if (httpResponse.status == 200) {
            if (
                httpResponse.body.status === 0 &&
                !httpResponse.body.reasonCode
            ) {
                this.nzNotificationService.create(
                    "error",
                    "请求错误",
                    httpResponse.body.message
                );
            } else {
                switch (httpResponse.body.reasonCode) {
                    case 'notLoggedIn':
                        this.noLoginShow()
                        break;
                }
            }
        }
    }

	/**
	 * 统一错误处理
	 * http 错误
	 * @param err
	 */
    handleError(err: HttpErrorResponse): Observable<any> {
        if (err.name == "TimeoutError") {
            this.nzNotificationService.create(
                "error",
                "网络超时",
                "网络请求超时，请重试！"
            );
        } else {
            switch (err.status) {
                case 0:
                    this.nzNotificationService.create(
                        "error",
                        "请求错误",
                        "请求地址错误，请联系开发人员！"
                    );
                    break;
                case 404:
                    this.nzNotificationService.create(
                        "error",
                        "请求错误",
                        "请求地址错误，请联系开发人员！"
                    );
                    break;
				case 401:
					console.log('我是401')
                    this.noLoginShow()
                    break;
                case 405:
                    this.nzNotificationService.create(
                        "error",
                        "请求错误",
                        "请求错误，请联系开发人员！"
                    );
                    break;
                case 500:
                    this.nzNotificationService.create(
                        "error",
                        "请求错误",
                        "服务器出错，请联系开发人员"
                    );
                    break;
            }
        }
        return throwError(err);
    }

    //登录失败显示
    noLoginShow() {
        if (!this._noLoginMsgShow) {
            this.nzNotificationService.create(
                "error",
                "认证失败",
                "您暂时没有权限操作！将前往登录"
            )
            this._noLoginMsgShow = true
            setTimeout(() => {
                this._noLoginMsgShow = false
            }, 3000)
        }
    }

}

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { AppDataService } from 'app/appdata/app-data.service';
import { HttpClient } from '@angular/common/http';
import { HttpSealService, HttpSealData, IBackHand } from '@ng-http';

@Injectable()
export class HsFileService {

	// 图片分组
	private getFileGroupListURL = this.httpSealData.commonHost + 'api/file/group/list';
	// 获取图片列表
	private getFileListURL = this.httpSealData.commonHost + 'api/file/list';

	// 图片分组添加
	private postFileGroupCreateURL = this.httpSealData.commonHost + 'api/file/group/create';
	// 图片分组修改
	private postFileGroupSaveURL = this.httpSealData.commonHost + 'api/file/group/save';
	// 图片分组删除
	private postFileGroupDelURL = this.httpSealData.commonHost + 'api/file/group/delete';
	// 移动图片分组
	private postFileGroupMoveURL = this.httpSealData.commonHost + 'api/file/save_files_group';

	// 删除附件
	private postFileDelURL = this.httpSealData.commonHost + 'api/file/delete';
	// 修改图片名称
	private postFileEditNameURL = this.httpSealData.commonHost + 'api/file/change_file_name';

	// 上传图片
	public postUploadURL = this.httpSealData.commonHost + 'api/upload';

	constructor(
		private httpSealData: HttpSealData,
		private httpSealService: HttpSealService,
		private httpClient: HttpClient,
		private appDataService: AppDataService
	) { }

	/**
	 * 图片分组
	 */
	public getFileGroupList( ): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getFileGroupListURL, {
			params: this.httpSealService.getParam({
				app_id: this.appDataService.appDataModel.app_id
			})
		})
	}

	/**
	 * 图片列表
	 */
	public getFileList( param: any = {} ): Observable<any> {
		return this.httpClient.get<IBackHand<any>>(this.getFileListURL, {
			params: this.httpSealService.getParam({
				...param,
				app_id: this.appDataService.appDataModel.app_id
			})
		})
	}

	/**
	 * 图片分组添加
	 */
	public postFileGroupCreate( param: any = {} ): Observable<any> {
		return this.httpClient.post<IBackHand<any>>(this.postFileGroupCreateURL, {
			...param,
			app_id: this.appDataService.appDataModel.app_id
		})
	}

	/**
	 * 图片分组修改
	 */
	public postFileGroupSave( param: any = {} ): Observable<any> {
		return this.httpClient.post<IBackHand<any>>(this.postFileGroupSaveURL, {
			...param,
			app_id: this.appDataService.appDataModel.app_id
		})
	}

	/**
	 * 图片分组删除
	 */
	public postFileGroupDel( param: any = {} ): Observable<any> {
		return this.httpClient.post<IBackHand<any>>(this.postFileGroupDelURL, {
			...param,
			app_id: this.appDataService.appDataModel.app_id
		})
	}

	/**
	 * 上传至图片分组
	 */
	public postUpload( param: any ): Observable<any> {
		return this.httpClient.post<IBackHand<any>>(this.postUploadURL, {
			...param,
			app_id: this.appDataService.appDataModel.app_id
		})
	}

	/**
	 * 修改图片名称
	 */
	public postFileEditName( param: any ): Observable<any> {
		return this.httpClient.post<IBackHand<any>>(this.postFileEditNameURL, {
			...param,
			app_id: this.appDataService.appDataModel.app_id
		})
	}

	/**
	 * 删除图片
	 */
	public postFileDel( param: any ): Observable<any> {
		return this.httpClient.post<IBackHand<any>>(this.postFileDelURL, {
			...param,
			app_id: this.appDataService.appDataModel.app_id
		})
	}

	/**
	 * 移动图片至分组
	 */
	public postFileGroupMove( param: any ): Observable<any> {
		return this.httpClient.post<IBackHand<any>>(this.postFileGroupMoveURL, {
			...param,
			app_id: this.appDataService.appDataModel.app_id
		})
	}

}

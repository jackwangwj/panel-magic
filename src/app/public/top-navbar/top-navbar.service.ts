import { Injectable } from '@angular/core';
import { Subject ,  Observable }    from 'rxjs';

import { AppDataService }	from '../../appdata/app-data.service'
import { NzMessageService, NzNotificationService }	from 'ng-zorro-antd'

import { HistoricalRecordModel,PublishSiteModel }	from '@ng-public/top-navbar/Model'
import { PanelExtendService } from '../../panel-extend/panel-extend.service';

@Injectable()
export class TopNavbarService {

	// 历史记录的数据模型
	public historicalRecordModel: HistoricalRecordModel = new HistoricalRecordModel()
	// 发布设置的数据模型
	public publishSiteModel: PublishSiteModel = new PublishSiteModel()
	// 自动保存的开关项
	public autoSaveEntity: any
	// 保存按钮的loading效果
	public btnSaveLoading: boolean = false

	constructor(
		private appDataService: AppDataService,
		private panelExtendService: PanelExtendService
	) { }


	/**
	 * @author GR-03
	 * @copyright 保存
	 * @param     [param]
	 * @return    [return]
	 * @param     {boolean          = false}       is_version [description]
	 * @return    {Observable<boolean>}   [description]
	 */
	public saveXcxAppData( ): Observable<boolean> {
		let _sub = new Subject<boolean>()
		this.btnSaveLoading = true;
		if (this.appDataService.currentAppDataForinPageData) {
			this.appDataService.currentAppDataForinPageData.eles = this.panelExtendService.handleSaveWidgetToOrientationModelData()
		};
		let _save_fn = ()=>{

		}
		_save_fn()
		return _sub.asObservable()
	}

}

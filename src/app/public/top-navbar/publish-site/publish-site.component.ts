import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { TopNavbarService }	from '../top-navbar.service'
import { AppDataService }	from '../../../appdata/app-data.service'
import { ImageGalleryService }	from '../../image-gallery/image-gallery.service'
import { PublishSiteModel }	from '../Model'

import { environment } from 'environments/environment';
import { ImageModel } from '@ng-public/image-gallery/Model/ImageModel';

@Component({
	selector: 'app-publish-site',
	templateUrl: './publish-site.component.html',
	styleUrls: ['./publish-site.component.scss']
})
export class PublishSiteComponent implements OnInit {

	// 确定按钮是否显示loading
	public isNzConfirmLoading: boolean = false
	// 要跳转的url地址
	public openUrl: string = 'javascript:;'

	// 是否已授权过
	public isAuthorization: boolean = false

	constructor(
		public tns: TopNavbarService,
		public ads: AppDataService,
		private igs: ImageGalleryService
	) { }

	ngOnInit() { }

	ngOnDestroy() { }

	/**
	 * @author GR-03
	 * @copyright 显示图片选择组件
	 * @param     [param]
	 * @return    [return]
	 */
	public showImagegallery(): void {
		this.igs.open({
			selectType: 'radio',
			nzOk: (data: ImageModel)=>{
				this.ads.appDataModel.thumb = data.url
			}
		})
	}

}

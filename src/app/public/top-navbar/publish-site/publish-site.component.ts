import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { TopNavbarService }	from '../top-navbar.service'
import { AppDataService }	from '../../../appdata/app-data.service'
import { ImageGalleryService }	from '../../image-gallery/image-gallery.service'
import { PublishSiteModel }	from '../Model'

import { HsXcxService }		from '../../../service'
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
		private hsXcxService: HsXcxService,
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

	/**
	 * @author GR-03
	 * @copyright 点击发布的时候做保存操作，同时新开页面跳转到管理端打包
	 * @param     [param]
	 * @return    [return]
	 */
	public publishGoToManager(): void {
		this.isNzConfirmLoading = true
		let _open = window.open("","_blank");
		// 保存操作
		// 先判断是否授权
		this.hsXcxService.getXcxAuthStatus( {
			app_id: this.ads.appDataModel.app_id
		} ).subscribe( res=>{
			if( res.status === 1 ) {
				if( res.data.auth_status == true ) this.isAuthorization = true;
				this.tns.saveXcxAppData( 'publish' ).subscribe(res=>{
					// 表示保存成功了
					// 同时跳转到管理端页面
					if( res == true ) {
						if( this.isAuthorization == false ) {
							this.openUrl = `${environment.siteurl+'home/#/'}manager/${this.ads.appDataModel.app_id}/package`;
						}else if( this.isAuthorization == true ) {
							this.openUrl = `${environment.siteurl+'home/#/'}manager/${this.ads.appDataModel.app_id}/xcx/xcx-setting`;
						}
						_open.location.href = this.openUrl
						this.isNzConfirmLoading = false
						this.tns.publishSiteModel['isVisiableModal'] = false
					}
				})
			}
		} )
	}

}

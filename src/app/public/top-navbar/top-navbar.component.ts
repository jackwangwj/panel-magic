import {
	Component,
	OnInit,
	AfterViewInit,
	ViewChild,
	Renderer2,
	OnDestroy,
	ElementRef,
	NgZone
} 	from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms'

import { NzMessageService, NzNotificationService }	from 'ng-zorro-antd'
import { TopNavbarService }	from './top-navbar.service'

import { AppDataService }	from '../../appdata/app-data.service'
import { HsXcxService }		from '../../service'
import { AppDataModel } from 'app/appdata';

import { cloneDeep }	from 'lodash'
import { environment } from 'environments/environment';

@Component({
	selector: 'app-top-navbar',
	templateUrl: './top-navbar.component.html',
	styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

	// 滚动监听的事件
	public scrollViewListen: any
	// 是否显示保存模板的弹窗
	public isShowTemplateModal: boolean = false
	// 保存模板弹窗的按钮loading
	public saveTemplateBtnLoading: boolean = false

	// 订阅模板标签的可观察对象
	public templatTagListRX$: Subscription

	// 当前小程序的信息
	public get appDataInfo(): AppDataModel {
		return this.ads.appDataModel
	}


	@ViewChild('dropdownEl') public dropdownEl: ElementRef

	constructor(
		private renderer: Renderer2,
		private _zone: NgZone,
		private fb: FormBuilder,
		private hsXcxService: HsXcxService,
		private nzMessageService: NzMessageService,
		public tbns: TopNavbarService,
		public ads: AppDataService
	) {
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.listenScrollUlLoading()
		// 开启自动保存
		this.tbns.openAutoSave()
	}

	ngOnDestroy(){
		if( this.templatTagListRX$ ) this.templatTagListRX$.unsubscribe()
	}

	/**
	 * @author GR-03
	 * @copyright
	 * 监听历史记录的滚动事件，用作懒加载事件处理
	 * 到50的时候再加载一次
	 * @param     [param]
	 * @return    [return]
	 */
	public listenScrollUlLoading(): void {
		this.scrollViewListen = this.renderer.listen( this.dropdownEl.nativeElement, 'scroll', (_e)=>{
			this._zone.run(()=>{
				let _scroll_top_number = _e.target.scrollTop
				if( _scroll_top_number >= this.tbns.historicalRecordModel.scrollTopNumber ) {
					this.tbns.historicalRecordModel.scrollTopNumber = this.tbns.historicalRecordModel.scrollTopNumber + 270
					this.scrollViewListen()
					this.tbns.fnGetRecordList()
					if( this.tbns.historicalRecordModel.isNext == true ) {
						this.listenScrollUlLoading()
					}
				}
            })
		} )
	}

	/**
	 * @author GR-03
	 * @copyright 点击管理新开窗口到管理端
	 * @param     [param]
	 * @return    [return]
	 */
	public openManager(): void {
		let openUrl = `${environment.siteurl}home/#/manager/${this.ads.appDataModel.app_id}`
		window.open( openUrl )
	}

	/**
	 * @author GR-03
	 * @copyright 执行保存操作
	 * @param     [param]
	 * @return    [return]
	 */
	public handleSave(): void {
		if( this.ads.appDataModel.template_info.template_type == null ) {
			this.tbns.saveXcxAppData()
		}else {
			// 如果是要保存模板则弹窗保存模板的设置
			this.isShowTemplateModal = true
		}
	}

	/**
	 * @author GR-03
	 * @copyright 处理发布小程序或保存模板并上架的按钮
	 * @param     [param]
	 * @return    [return]
	 */
	public handlePublishSiteOrShelvesTemplate(): void {
		if( this.ads.appDataModel.template_info.template_type == null ) {
			this.tbns.publishSiteModel['isVisiableModal'] = true
		}else {
			this.isShowTemplateModal = true
			// 修改templateModel.status的数据
		}
	}

	/**
	 * @author GR-03
	 * @copyright 处理保存模板
	 * @param     [param]
	 * @return    [return]
	 */
	public handleTemplateSave(): void {
		this.saveTemplateBtnLoading = true
		this.hsXcxService.postAppDataAddTemplate({
			...this.ads.appDataModel,
		}).subscribe(res=>{
			this.saveTemplateBtnLoading = false
			if( res.status === 1 ) {
				this.isShowTemplateModal = false
				this.nzMessageService.create( 'success','保存成功' )
			}
		},error=>{
			this.saveTemplateBtnLoading = false;
			this.isShowTemplateModal = false
		})
	}

	/**
	 * @author GR-03
	 * @copyright 接收模板标签选择的回调
	 * @param     [param]
	 * @return    [return]
	 * @param     {any}       data [description]
	 */
	public acceptTemplateSelectChange( data: any ): void {
	}

}

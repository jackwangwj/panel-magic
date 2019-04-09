import {
    Component,
    OnInit,
    ViewChild,
    Renderer2,
    ElementRef,
    NgZone
} 	from '@angular/core';
import { Subscription } from 'rxjs'
import { FormBuilder } from '@angular/forms'

import { NzMessageService }	from 'ng-zorro-antd'
import { TopNavbarService }	from './top-navbar.service'

import { AppDataService }	from '../../appdata/app-data.service'
import { AppDataModel } from 'app/appdata';


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

    // 当前页面内容的信息
    public get appDataInfo(): AppDataModel {
        return this.ads.appDataModel
    }


    @ViewChild('dropdownEl') public dropdownEl: ElementRef

    constructor(
        private nzMessageService: NzMessageService,
        public tbns: TopNavbarService,
        public ads: AppDataService
    ) {
    }

    ngOnInit() {
    }

    /**
     * @author GR-03
     * @copyright 执行保存操作
     * @param     [param]
     * @return    [return]
     */
    public handleSave(): void {

	}

    /**
     * @author GR-03
     * @copyright 处理发布或保存模板并上架的按钮
     * @param     [param]
     * @return    [return]
     */
    public handlePublishSiteOrShelvesTemplate(): void {

	}

}

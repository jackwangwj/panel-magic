import {
    Component,
    OnInit,
    Input,
    ViewChild,
    OnDestroy
}   from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { ueditorConf } from './ueditor.conf'

import { UEditorComponent }    from 'ngx-ueditor'
import { ImageGalleryService }    from '@ng-public/image-gallery/image-gallery.service'
import { WidgetModel } from '../../../Model/WidgetModel';
import { environment } from 'environments/environment';
import { ImageModel } from '@ng-public/image-gallery/Model/ImageModel';

@Component({
    selector: 'app-rich-text-site-view',
    templateUrl: './rich-text-site-view.component.html',
    styleUrls: ['./rich-text-site-view.component.scss']
})
export class RichTextSiteViewComponent implements OnInit {

    @ViewChild('ueditorEl') public ueditorEl: UEditorComponent;

	private _autoWidget: WidgetModel = new WidgetModel();
    public uedConf:any = ueditorConf

    @Input()
    public get autoWidget(): WidgetModel {
        return this._autoWidget;
    }
    public set autoWidget(v: WidgetModel) {
        this._autoWidget = v;
    }

    constructor(
        private igs: ImageGalleryService
    ) { }

    ngOnInit() { }

    ngOnDestroy() { }

    /**
	 * 组件加载完之后的回调
     */
    public onPreReady( comp: UEditorComponent ): void {
        // 创建一个上传图片的按钮事件，替代默认的图片上传
        window['UE'].registerUI('myIamgeSelect', (editor, uiName) => {
            //创建一个button
            var btn = new window['UE'].ui.Button({
                //按钮的名字
                name: uiName,
                //提示
                title: uiName,
                //添加额外样式，指定icon图标，这里默认使用一个重复的icon
                cssRules: 'background-position: -726px -77px;',
                //点击时执行的命令
                onclick: ()=> {
                    this.showImageGallery()
                }
            });
            return btn;
        }, 15, comp.id);
    }

    /**
	 * 显示图片库选择
     */
    public showImageGallery(): void {
		this.igs.open({
			selectType: 'checkbox',
			nzOk: (data: ImageModel[])=>{
				let _src_arr: any[] = []
				if (Array.isArray(data)) {
					data.forEach(_e => {
						_src_arr.push({
							src: environment.fileurl + _e.url,
							width: _e.width > 414 ? '414' : _e.width.toString()
						})
					})
					// 选择完之后插入图片列表
					this.ueditorEl.Instance.execCommand('insertimage', _src_arr)
				}
			}
		})
    }

	/**
	 * 富文本变化
	 */
	public accpetRichChange( data: any ): void {
		if (this.autoWidget.customfeature && this.autoWidget.customfeature.changeDetected ) {
			this.autoWidget.customfeature.changeDetected()
		}
	}

}

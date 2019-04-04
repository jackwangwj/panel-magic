import { Injectable } from '@angular/core'
import { PanelWidgetModel } from '../../Model';
import { NavigationBarModel } from './navigation-bar-site-view/Model';
import { BehaviorSubject } from 'rxjs';
import { HostItemModel } from '../../Model/HostModel';

@Injectable({
	providedIn: 'root'
})
export class NavigationBarViewService {
	// 当前头部标题拦的数据模型
	public navigationWidgetModel: NavigationBarModel = new NavigationBarModel()

	// 需要传递给组件设置类的panwlwidget类
	public navigationPanelSiteWidget: PanelWidgetModel = new PanelWidgetModel(<HostItemModel>{
		autoWidget: {
			type: 'navigationbar',
			content: { navigationModel: new NavigationBarModel() },
			customfeature: {},
			style: {
				data: {},
				children: []
			}
		}
	})

	constructor() {}

	// 设置标题字体颜色
	public setFrontColor(color: string): void {
		this.navigationWidgetModel.frontColor = color
	}

	// 设置标题背景颜色
	public setBgColor(color: string): void {
		this.navigationWidgetModel.bgColor = color
	}

	// 重置颜色
	public initNavigationWidget(): void {
		this.navigationWidgetModel.reset()
	}

	// 附值标题设置数据模型
	public setNavigationWidgetSiteData(data: NavigationBarModel = this.navigationWidgetModel): void {
		this.navigationPanelSiteWidget.autoWidget.content.navigationModel = data
	}
}


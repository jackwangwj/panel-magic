import { WidgetModel } from 'app/panel-extend/panel-widget/Model/WidgetModel';

interface CustomFeatureable {
	title: string;
	name: string;
	// 是否显示底部导航
	isHasTabbar: boolean;
	// 是否是首页
	isHomePage: boolean;
	// 当前页面背景色
	bgColor: string;
	// 导航头部字体颜色
	navFrontColor: string;
	// 导航条背景颜色
	navBgColor: string;
	// 当前页面的高度
	pageHeight: number
}

export class AppDataObjectModel{

	// 页面路由
	public router : string;
	// 该页面的所有组件数据
	public eles: Array<WidgetModel>;
	// 该页面的信息，包括标题和名称
	public customfeature : CustomFeatureable;

	constructor(data: AppDataObjectModel = null ){
		this.initData()
		this.setData( data )
	}

	public initData(): void {
		this.router = ''
		this.eles = []
		this.customfeature = {
			title: '',
			name: '',
			isHasTabbar: false,
			bgColor: '#ffffff',
			isHomePage: false,
			navBgColor: '#000000',
			navFrontColor: '#ffffff',
			pageHeight: 736
		}
	}

	public setData( data: any ): void {
		if( data && Object.keys( data ).length > 0 ) {
			this.router 		= data.router
			this.eles 			= data.eles
			this.customfeature 	= data.customfeature
		}
	}

	// 赋值每一个页面项的customfeature数据配置
	public setCustomfeatureData(keys: 'bgColor' | 'isHasTabbar' | 'name' | 'title' | 'isHomePage' | 'navBgColor' | 'navFrontColor' | 'pageHeight', value: any ): void {
		this.customfeature[keys] = value
	}

}

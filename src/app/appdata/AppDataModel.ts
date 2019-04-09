import { CataDataModel }	from './CataDataModel'
import { AppDataObjectModel }	from './AppDataObjectModel'
import { get }	from 'lodash'

import { NewPageModel } from '../panel-extend/panel-catalogue/Model';
import { WidgetModel } from '../panel-extend/panel-widget/Model/WidgetModel';

/**
 * 配置项选项
 */
class AppConfigModel {
	public tabbar_widget: WidgetModel
	// 首页的router
	public home_page_router: string
	// 标尺辅助线数据
	// public canvas_scaleplate:
}

export class AppDataModel{

	// 应用的id
	public app_id : string;
	// 分组页面对象数据
	public cata_data : Array<CataDataModel>;
	// 数据对象
	public app_data: { [key: string]: AppDataObjectModel};
	// app的配置选项
	public app_config: AppConfigModel;
	// 项目名称
	public app_name: string;
	// 简介
	public remark: string;
	// 缩略图
    public thumb: string;
    //所有表单数据
    public form_data:Array<FormData>

	constructor(){
		this.initData()
	}

	/**
	 * 初始化数据
	 */
	public initData(): void {
		this.app_id = ''
		this.cata_data = []
		this.app_data = {}
		this.app_config = new AppConfigModel()
		this.app_name = ''
		this.remark = ''
		this.thumb = ''
	}

	/**
	 * 赋值数据
	 */
	public setData( data: any ): void {
		if( data && Object.keys( data ).length > 0 ) {
			this.app_id = get(data,'app_id','');
			if (get(data, 'cata_data') && Array.isArray(data.cata_data ) ) {
				this.cata_data.length = 0;
				data.cata_data.forEach(_e => {
					this.cata_data.push(new CataDataModel(_e))
				})
			};
			if (get(data,'app_data') ) {
				for (let e in data.app_data ) {
					this.handleCurrentAppDataAllPageData(e, data.app_data[e] )
				}
			};
			if (get(data,'app_config') ) {
				for (let e in data.app_config ) {
					if( e == 'tabbar_widget' ) {
						this.app_config.tabbar_widget = new WidgetModel(data.app_config.tabbar_widget)
					};
					if (e == 'home_page_router' ) {
						this.app_config.home_page_router = data.app_config.home_page_router
					}
				}
			};
			this.app_name = get(data,'app_name');
			this.remark = get(data,'remark');
			this.thumb = get(data,'thumb');
		}
	}

	/**
	 * 转化所有页面的数据为AppDataObjectModel数据模型
	 */
	public handleCurrentAppDataAllPageData(page: string, target: AppDataObjectModel ): void {
		const _app_data_object: AppDataObjectModel = <AppDataObjectModel>{
			router 			: page,
			eles 			: [],
			customfeature 	: {
				title: 		 	target.customfeature.title,
				name: 		 	target.customfeature.name,
				isHasTabbar: 	target.customfeature.isHasTabbar,
				isHomePage:  	target.customfeature.isHomePage,
				bgColor: 	 	target.customfeature.bgColor,
				navBgColor:  	target.customfeature.navBgColor,
				navFrontColor: 	target.customfeature.navFrontColor,
				pageHeight: 	target.customfeature.pageHeight
			}
		};
		if (Array.isArray(target.eles) && target.eles.length > 0) {
			target.eles.forEach(_e => {
				const _widget = new WidgetModel(_e)
				_app_data_object.eles.push(_widget)
			})
		};
		this.app_data[page] = new AppDataObjectModel(<AppDataObjectModel>_app_data_object);
	}

	/**
	 * 添加新页面，同时把新创建的page信息导入到app_data数据当中
	 */
	public addNewPage( data: NewPageModel, index: number = -1 ): string {
		let _router: string = ''
		for (let i: number = 0; i < this.cata_data.length; i++) {
			if (this.cata_data[i].uniqueId == data.groupId) {
				_router = this.handleNewPageAppData(data.name)
				this.cata_data[i].newPage(_router, data.name, index)
				break
			}
		}
		return _router
	}

	/**
	 * 处理app_data属性里的数据，当创建成功一个新页面的时候把数据导入进来，同时取该对象的最后一个属性加一之后成为新的page属性
	 * 避免重复
	 * 同时返回该页面的router
	 */
	public handleNewPageAppData( name: string ): string {
		let _new_page: number;
		for (let e in this.app_data) {
			let _number = e.replace(/[^0-9]/ig, "")
			_new_page = +_number
		};
		if( _new_page == undefined ) _new_page = 9999;
		// 此时_new_page就是最后一条的page
		// 然后我们就可以把新创建的新页面的数据同时创建在这里了;
		const _app_data_object: AppDataObjectModel = <AppDataObjectModel>{
			router 			: `page${_new_page+1}`,
			eles 			: [],
			customfeature 	: {
				title: name,
				name: name,
				isHasTabbar: false,
				bgColor: '#ffffff',
				isHomePage: false,
				navBgColor: '#000000',
				navFrontColor: '#ffffff',
				pageHeight: 736
			}
		}
		this.app_data[`page${_new_page + 1}`] = new AppDataObjectModel(<AppDataObjectModel>_app_data_object)
		return `page${_new_page+1}`
	}

	/**
	 * 创建新分组
	 */
	public addNewGroup( name: string ): void {
		const _new_cata = new CataDataModel({ group: name })
		this.cata_data.push(_new_cata)
	}

	/**
	 * 删除分组
	 */
	public delGroup( index: number ): void {
		this.cata_data.splice(index, 1)
	}

	/**
	 * 处理当删除某个页面或者删除某个分组的时候，也得把app_data这个属性里的对应的对象也删除喽！
	 */
	public delAppDataPage( pages: string | Array<string> ): void {
		const _del_obj = (attr: string) => {
			if (this.app_data[attr]) {
				delete this.app_data[attr]
			}
		};
		if (Array.isArray(pages)) {
			Array.from(pages).forEach(_attr => {
				_del_obj(_attr)
			})
		} else {
			_del_obj(pages.toString())
		}
	}

}

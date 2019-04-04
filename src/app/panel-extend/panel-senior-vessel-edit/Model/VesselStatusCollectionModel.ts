import { uniqueId } from "@ng-public/util";
import { WidgetModel } from "app/panel-extend/panel-widget/Model/WidgetModel";

/**
 * 动态容器的状态集合数据模型
 * 表示每一个状态下的widgetlist集合以及对应状态的名称、可用于拓展
 */

export class VesselStatusCollectionModel {

	// 状态名称
	public name: string = '';
	// 状态的唯一标示
	public uniqueId: string = '';
	// 该状态下的widget集合
	public widgetList: WidgetModel[] = []
	// 是否处于编辑状态
	public isEdit: boolean = false

	constructor(data?: VesselStatusCollectionModel ) {
		this.setData(data)
	}

	public setData(data: VesselStatusCollectionModel) {
		if (data) {
			for (const key in this) {
				if ((<Object>data).hasOwnProperty(key)) {
					if (key == 'widgetList' && Array.isArray(data.widgetList) ) {
						let _arr = []
						data.widgetList.forEach(_w=>{
							_arr.push(new WidgetModel(_w) )
						});
						this.widgetList = _arr
					}else {
						this[key] = (<any>data)[key]
					}
				}
			}
		}
	}

	/**
	 * 初始化状态列表
	 */
	public initStatus( name: string ): void {
		this.name = name;
		this.uniqueId = <string>uniqueId();
		this.widgetList = [];
		this.isEdit = false
	}

}

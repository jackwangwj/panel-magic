import { PagesModel } from './PagesModel'

import { uniqueId } from '../public/util'

export class CataDataModel {
	// 分组名称
	public group: string
	// 分组页面
	public pages: Array<PagesModel>
	// 是否处于编辑状态,默认都是为false
	public isEdit: boolean
	// 根据时间戳唯一标示符
	public uniqueId: number

	constructor(data: any = {}) {
		this.initData()
		this.setData(data)
	}

	/**
	 * @author GR-03
	 * @copyright 初始化数据
	 * @param     [param]
	 * @return    [return]
	 */
	public initData(): void {
		this.group = ''
		this.pages = []
		this.isEdit = false
		setTimeout(() => {
			this.uniqueId = +uniqueId(false)
		}, 10)
	}

	/**
	 * @author GR-03
	 * @copyright 赋值数据
	 * @param     [param]
	 * @return    [return]
	 */
	public setData(data: any): void {
		if (data && Object.keys(data).length > 0) {
			if (data.group) this.group = data.group
			if (data.pages && Array.isArray(data.pages)) {
				this.pages.length = 0
				data.pages.forEach(_e => {
					this.pages.push(new PagesModel(_e))
				})
			}
		}
	}

	/**
	 * @author GR-03
	 * @copyright 创建新页面,默认name和title是同一个名称,同时添加新的router
	 * @param
	 * 参数index表示，如果不传则在后面添加新数据，否则在指定位置插入新数据
	 * @return    [return]
	 * @param     {string}    router [description]
	 * @param     {string}    name   [description]
	 * @param     {number =      -1}          index [description]
	 */
	public newPage(router: string, name: string, index: number = -1): void {
		if (index == -1) {
			this.pages.push(new PagesModel({
					title: name,
					name: name,
					router: router
				}))
		} else if (index > 0) {
			this.pages.splice(index, 0, new PagesModel({
					title: name,
					name: name,
					router: router
				}))
		}
	}

	/**
	 * @author GR-03
	 * @copyright 删除页面
	 * @param     [param]
	 * @return    [return]
	 */
	public delPage(index: number): void {
		this.pages.splice(index, 1)
	}
}

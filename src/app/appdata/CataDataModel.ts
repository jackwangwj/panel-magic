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

	public initData(): void {
		this.group = ''
		this.pages = []
		this.isEdit = false
		setTimeout(() => {
			this.uniqueId = +uniqueId(false)
		}, 10)
	}

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

	// 创建新页面,默认name和title是同一个名称,同时添加新的router
	// 参数index表示，如果不传则在后面添加新数据，否则在指定位置插入新数据
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

	public delPage(index: number): void {
		this.pages.splice(index, 1)
	}
}

import { uniqueId } from '../public/util'

export class PagesModel {
	// 页面对应的路径
	public router: string
	// 页面的名称
	public name: string
	// 页面的标题
	public title: string
	// 是否处于编辑状态
	public isEdit: boolean
	// 根据时间戳的唯一标识符
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
		this.title = ''
		this.name = ''
		this.router = ''
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
	 * @param     {any}       data [description]
	 */
	public setData(data: any): void {
		if (data && Object.keys(data).length > 0) {
			if (data['title']) this.title = data['title']
			if (data['name']) this.name = data['name']
			if (data['router']) this.router = data['router']
		}
	}
}

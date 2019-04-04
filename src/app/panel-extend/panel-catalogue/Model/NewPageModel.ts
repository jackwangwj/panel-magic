export class NewPageModel {
	// 是否显示弹出页面
	public visible: boolean
	// 页面名称
	public name: string
	// 所在分组的id
	public groupId: number

	constructor() {
		this.initData()
	}

	/**
	 * @author GR-03
	 * @copyright 初始化数据
	 * @param     [param]
	 * @return    [return]
	 */
	public initData(): void {
		this.visible = false
		this.name = '新页面'
		this.groupId = 0
	}

	/**
	 * @author GR-03
	 * @copyright 赋值数据
	 * @param     [param]
	 * @return    [return]
	 */
	public setData(data: any): void {
		this.name = data.name
		this.groupId = data.groupId
	}
}

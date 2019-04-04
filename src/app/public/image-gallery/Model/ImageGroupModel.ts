// 图片分组数据模型
export class ImageGroupModel {
	public id: number = 0
	public name: string = ''

	// 该分组下的图片总数
	public total: number = 0;

	// 是否允许删除
	public isAllowDel: boolean = false;

	// 是否允许编辑
	public isAllowEdit: boolean = false;

	// 是否进入编辑模式
	public isEnterEdit: boolean = false;

	// 进入编辑模式之前固定的名称
	public fixedName: string = ''

	constructor(data?: ImageGroupModel) {
		this.setData(data)
	}

	public setData(data: ImageGroupModel): void {
		if (data) {
			for (let e in this) {
				if ((<Object>data).hasOwnProperty(e)) {
					this[e] = (<any>data)[e]
				}
			}
		}
	}
}

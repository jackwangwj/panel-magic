// 产品详情数据模型
export class ProductDetailModel {

	// 产品ID
	public id: string = '';
	// 产品名称
	public name: string = '';
	// 产品缩略图
	public thumb: string = '';
	// 产品简介
	public intro: string = '';

	constructor( data?: ProductDetailModel ) {
		this.setData(data)
	}

	public setData(data: ProductDetailModel ): void {
		if( data ) {
			for( let e in this ) {
				if( (<Object>data).hasOwnProperty(e) ) {
					this[e] = (<any>data)[e]
				}
			}
		}
	}

}

import { environment } from "environments/environment";

// 图片本身的数据模型
export class ImageModel {

	// 图片对应的分组id
	public groupId: number = 0;

	public id: number 		= null;
	public name: string 	= '';
	public url: string 		= '';
	public width: number 	= 0;
	public height: number 	= 0;

	// 图片在面板panel的初始size大小
	public panelWidth: number = 0;
	public panelHeight: number = 0;

	// 是否被选中
	public isActive: boolean = false;

	// 是否进入编辑名称模式
	public isEnterEditName: boolean = false;
	// 修改名称之前固定的原始名称
	public fixedName: string = ''

	constructor(data?: ImageModel) {
		this.setData(data)
	}

	public setData(data: ImageModel): void {
		if (data) {
			for (let e in this) {
				if ((<Object>data).hasOwnProperty(e)) {
					this[e] = (<any>data)[e]
				}
			};
		}
	}

	/**
	 * 计算图片的原始宽高
	 */
	public calcImageSize(): void {
		if( this.url ) {
			let _image = new Image();
			_image.src 	= environment.fileurl + this.url;
			this.width 	= _image.width;
			this.height = _image.height;
			_image = null;
			// 以750为图片尺寸基准，通过计算图片与主视图panel的宽度比来等比例计算尺寸size
			// 大于750的已750为计算
			if( this.width >= 750 ) {
				this.panelWidth = 414;
			}else if( this.width < 750 ) {
				this.panelWidth = (this.width / 750) * 414;
			}
			this.panelHeight = this.panelWidth * (this.height / this.width)
		}
	}


}

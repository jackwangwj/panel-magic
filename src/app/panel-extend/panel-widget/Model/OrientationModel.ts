export interface styleable {
	width: number | string,
	height: number | string,
	left: number | string,
	top: number | string,
	zIndex: number,
	rotate?: number
}

export class OrientationModel implements styleable {
	// 组件的宽度
	public width : number;
	// 组件的高度
	public height : number;
	// 组件的左定位
	public left : number;
	// 组件的上定位
	public top : number;
	// 组件的层级关系
	public zIndex : number;
	// 旋转角度
	public rotate : number;

	constructor( data?: OrientationModel){
		this.initData()
		this.setData( data )
	}

	/**
	 * 初始化数据
	 */
	public initData(): void {
		this.width = null
		this.height = null
		this.left = -100
		this.top = -100
		this.zIndex = 1
		this.rotate = 0
	}

	/**
	 * 赋值所有数据
	 */
	public setData( data: OrientationModel ) {
		if (data) {
			for (let e in this) {
				if ((<Object>data).hasOwnProperty(e)) {
					this[e] = (<any>data)[e]
				}
			}
		}
	}

}

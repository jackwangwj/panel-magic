import { ImageItemModel }	from './ImageItemModel'
import { environment } from 'environments/environment';

type FILLTYPE = 'cover' | ''
type QUANTITY = 4 | 5 | 6 | 7 | 8 | 9 | 10

/**
 * 选择图片的内容数据模型
 */
export class PictureAdModel{

	// 图片列表
	public imageList : Array<ImageItemModel>;
	// 填充方式
	public fillType : FILLTYPE;
	// 图片间隙
	public crevice : number;
	// 图片的自适应宽度, 默认为100%
	public imageCalcWidth : number;
	// 轮播的高度
	public carouselHeight: number;
	// 横向滑动模型的时候设置外部容器的高度。随着第一张图片的比例高度不同而不同
	public transverseHeight: number;
	// 用来影响图片左右边距的宽度
	public hostPaddingWidth: number

	constructor( obj: any = {} ){
		this.initData()
		this.setData( obj )
	}

	/**
	 * @author GR-03
	 * @copyright 赋值操作
	 * @param     [param]
	 * @return    [return]
	 * @param     {any    = {}} obj [description]
	 */
	public setData( obj: any = {} ): void {
		if( obj && Object.keys( obj ).length > 0 ) {
			this.imageList 		= ((): Array<ImageItemModel>=>{
				let _arr = []
				if( Array.isArray( obj['imageList'] ) && obj['imageList'].length > 0 ) {
					obj['imageList'].forEach(_e=>{
						_arr.push( new ImageItemModel( _e ) )
					})
				}
				return _arr
			})()
			this.fillType 		= obj['fillType']
			this.crevice	 	= obj['crevice']
			this.imageCalcWidth = obj['imageCalcWidth']
			this.carouselHeight = obj['carouselHeight']
			this.transverseHeight = obj['transverseHeight']
			this.hostPaddingWidth = obj['hostPaddingWidth']
		}
	}

	/**
	 * @author GR-03
	 * @copyright 格式化数据
	 * @param     [param]
	 * @return    [return]
	 */
	public initData(): void {
		this.imageList 		= []
		this.fillType 		= ''
		this.crevice	 	= 0
		this.imageCalcWidth 	= 0
		this.carouselHeight = 200
		this.transverseHeight = 0
		this.hostPaddingWidth = 414
	}

	/**
	 * @author GR-03
	 * @copyright 添加新的图片列表
	 * 参数src为图片的地址，必传
	 * @param     [param]
	 * @return    [return]
	 * @param     {string}    src [description]
	 */
	public addImage( src: string ): void {
		let _img_obj = new Image()
		_img_obj.src = environment.fileurl + src
		this.imageList.push( new ImageItemModel( {
			imgSrc: src,
			width: _img_obj.width,
			height: _img_obj.height
		} ) )
	}

	/**
	 * @author GR-03
	 * @copyright 删除某一个图片列表的数据
	 * @param     [param]
	 * @return    [return]
	 */
	public delImage( index: number ): void {
		this.imageList.splice( index,1 )
	}

	/**
	 * @author GR-03
	 * @copyright 重置图片列表数据
	 * @param     [param]
	 * @return    [return]
	 */
	public initImageList(): void {
		this.imageList.length = 0
	}

	/**
	 * @author GR-03
	 * @copyright 根据第一张图片的宽度和模版类型的固定宽带等比例的计算外部容器的高度
	 * @param     [param]
	 * @return    [return]
	 */
	public handleTransverseHeight( _width: number ): void {
		if( this.imageList && Array.isArray( this.imageList ) && this.imageList.length > 0 ) {
			let _first_img_width  = this.imageList[0]['width']
			let _first_img_height = this.imageList[0]['height']
			this.imageList[0]['containerWidth'] = _width
			this.transverseHeight = (_first_img_height * _width )/_first_img_width
			// 对其余的图片进行containerWidth计算
			for( let i: number = 1; i<this.imageList.length; i++ ) {
				this.imageList[i].handleContainerWidth( this.transverseHeight )
			}
		}
	}

	/**
	 * @author GR-03
	 * @copyright 根据第一张图片的宽度和模版类型的固定宽带等比例的计算外部容器的轮播图的高度
	 * @param     [param]
	 * @return    [return]
	 * @param     {number}    _width [description]
	 */
	public handleCarouselHeight( _width: number ): void {
		if( this.imageList && Array.isArray( this.imageList ) && this.imageList.length > 0 ) {
			let _first_img_width  = this.imageList[0]['width']
			let _first_img_height = this.imageList[0]['height']
			this.carouselHeight = (_first_img_height * _width )/_first_img_width
			this.imageList[0]['containerHeight'] = this.carouselHeight
			// 对其余的图片进行containerHeight计算
			for( let i: number = 1; i<this.imageList.length; i++ ) {
				this.imageList[i].handleContainerHeight( this.carouselHeight )
			}
		}
	}

}

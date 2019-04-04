import { Subject } from "rxjs";
import { BaseValueChangeClass } from "app/baseClass";

type TCrosswise = 'left' | 'center' | 'right' | ''
type TVertical = 'top' | 'center' | 'bottom' | ''
type Tlineation = 'bottom' | 'center' | ''

/**
 * 通用的文字设置
 */
export class PanelTextModel extends BaseValueChangeClass<PanelTextModel> {

	// 字体大小
	private _fontSize : number = 12;
	// 是否加粗
	private _isBold : boolean = false;
	// 是否斜体
	private _isItalic : boolean = false;
	// 划线方式，下划线还是中线
	private _lineationType : Tlineation = '';
	// 字体颜色
	private _fontColor : string = '#000';
	// 横向对齐方式
	private _crosswiseType : TCrosswise = '';
	// 纵向对齐方式
	private _verticalType : TVertical = 'center';
	// 组件高度（用于计算linehight）
	private _height : number;

	public get height() : number { return this._height }
	public set height(v : number) { this._height = v }

	public get verticalType() : TVertical { return this._verticalType }
	public set verticalType(v : TVertical) {
		this._verticalType = v;
		this.valueChange$.next(this)
	}

	public get crosswiseType() : TCrosswise { return this._crosswiseType }
	public set crosswiseType(v : TCrosswise) {
		this._crosswiseType = v;
		this.valueChange$.next(this)
	}

	public get fontColor() : string { return this._fontColor }
	public set fontColor(v : string) {
		this._fontColor = v;
		this.valueChange$.next(this)
	}

	public get lineationType() : Tlineation { return this._lineationType }
	public set lineationType(v : Tlineation) {
		this._lineationType = v;
		this.valueChange$.next(this)
	}

	public get isItalic() : boolean { return this._isItalic }
	public set isItalic(v : boolean) {
		this._isItalic = v;
		this.valueChange$.next(this)
	}

	public get isBold() : boolean { return this._isBold }
	public set isBold(v : boolean) {
		this._isBold = v;
		this.valueChange$.next(this)
	}

	public get fontSize() : number { return this._fontSize }
	public set fontSize(v : number) {
		this._fontSize = v;
		this.valueChange$.next(this)
	}

	constructor() { super() }

	/**
	 * 初始化
	 */
	public resetData(): void {
		this.height = null;
		this.fontSize = 12
		this.isBold = false
		this.isItalic = false
		this.lineationType = ''
		this.fontColor = ''
		this.crosswiseType = ''
		this.verticalType = 'center'
	}

	/**
	 * 赋值
	 */
	public setData( data: {
		height?: number,
		fontSize?:number,
		isBold?: boolean,
		isItalic?: boolean,
		lineationType?: Tlineation,
		fontColor?: string,
		crosswiseType?: TCrosswise,
		verticalType?: TVertical
	} ): void {
		if (data) {
			for (let e in this) {
				if ((<Object>data).hasOwnProperty(e)) {
					this[e] = (<any>data)[e]
				}
			}
		}
	}


	/**
	 * 获取所有值
	 */
	public getValue(): {
		height: number,
		fontSize: number,
		isBold: boolean,
		isItalic: boolean,
		lineationType: Tlineation,
		fontColor: string,
		crosswiseType: TCrosswise,
		verticalType: TVertical
	} {
		return {
			height: this.height,
			fontSize: this.fontSize,
			isBold: this.isBold,
			isItalic: this.isItalic,
			lineationType: this.lineationType,
			fontColor: this.fontColor,
			crosswiseType: this.crosswiseType,
			verticalType: this.verticalType,
		}
	}

	/**
	 * 返回样式数据
	 * 需要传递height属性
	 */

	public styleContent( height: number = this.height ) : {[key: string]: string} {
		return {
			'font-size': `${this.fontSize}px`,
			'font-weight': this.isBold == true ? 'bold' : 'normal',
			'font-style': this.isItalic == true ? 'italic' : 'normal',
			'text-decoration': this.lineationType == 'bottom' ? 'underline'
				: this.lineationType == 'center' ? 'line-through'
				: 'initial',
			'color': this.fontColor,
			'text-align': this.crosswiseType == '' ? 'initial' :this.crosswiseType,
			'line-height': this.verticalType == 'top' ? `${this.fontSize}px`
				: this.verticalType == 'center' ? `${height}px`
				: this.verticalType == 'bottom' ? `${height * 2 - this.fontSize}px`
				: 'initial'
		}
	}




}

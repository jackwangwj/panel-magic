import { Subject } from "rxjs";
import { BaseValueChangeClass } from "app/baseClass";

export type TBorderStyle = 'solid' | 'dashed' | 'dotted' | 'none'

/**
 * 外观设置
 */
export class PanelFacadeModel extends BaseValueChangeClass<PanelFacadeModel>{

	private _bgColor : string = '';
	private _borderColor : string = '';
	private _borderStyle : TBorderStyle = 'none';
	private _borderNumber : number = 0;
	private _ltRadius : number = 0;
	private _rtRadius : number = 0;
	private _lbRadius : number = 0;
	private _rbRadius : number = 0;
	private _isRadiusAssociated : boolean = false;

	// 半径是否联动
	public get isRadiusAssociated() : boolean { return this._isRadiusAssociated }
	public set isRadiusAssociated(v : boolean) {
		this._isRadiusAssociated = v;
		this.valueChange$.next(this)
	}

	// 右下角半径
	public get rbRadius() : number { return this._rbRadius }
	public set rbRadius(v : number) {
		this._rbRadius = v;
		this.valueChange$.next(this)
	}

	// 左下角半径
	public get lbRadius() : number { return this._lbRadius }
	public set lbRadius(v : number) {
		this._lbRadius = v;
		this.valueChange$.next(this)
	}

	// 右上角半径
	public get rtRadius() : number { return this._rtRadius }
	public set rtRadius(v : number) {
		this._rtRadius = v;
		this.valueChange$.next(this)
	}

	// 左上角半径
	public get ltRadius() : number { return this._ltRadius }
	public set ltRadius(v : number) {
		this._ltRadius = v;
		this.valueChange$.next(this)
	}

	public get borderNumber() : number { return this._borderNumber }
	public set borderNumber(v : number) {
		this._borderNumber = v;
		this.valueChange$.next(this)
	}

	public get borderStyle() : TBorderStyle { return this._borderStyle }
	public set borderStyle(v : TBorderStyle) {
		this._borderStyle = v;
		this.valueChange$.next(this)
	}

	public get borderColor() : string { return this._borderColor }
	public set borderColor(v : string) {
		this._borderColor = v;
		this.valueChange$.next(this)
	}

	// 背景色
	public get bgColor() : string { return this._bgColor }
	public set bgColor(v : string) {
		this._bgColor = v;
		this.valueChange$.next(this)
	}

	constructor() { super() }

	/**
	 * 重置数据
	 */
	public resetData(): void {
		this.bgColor =  '';
		this.borderColor =  '';
		this.borderStyle =  'solid';
		this.borderNumber =  0;
		this.ltRadius =  0;
		this.rtRadius =  0;
		this.lbRadius =  0;
		this.rbRadius =  0;
		this.isRadiusAssociated =  false;
	}

	/**
	 * 赋值
	 */
	public setData( data: {
		bgColor ?: string,
		borderColor ?: string,
		borderStyle ?: TBorderStyle,
		borderNumber ?: number,
		ltRadius ?: number,
		rtRadius ?: number,
		lbRadius ?: number,
		rbRadius ?: number,
		isRadiusAssociated ?: boolean,
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
		bgColor : string,
		borderColor : string,
		borderStyle : TBorderStyle,
		borderNumber : number,
		ltRadius : number,
		rtRadius : number,
		lbRadius : number,
		rbRadius : number,
		isRadiusAssociated : boolean
	} {
		return {
			bgColor : this.bgColor,
			borderColor : this.borderColor,
			borderStyle : this.borderStyle,
			borderNumber : this.borderNumber,
			ltRadius : this.ltRadius,
			rtRadius : this.rtRadius,
			lbRadius : this.lbRadius,
			rbRadius : this.rbRadius,
			isRadiusAssociated : this.isRadiusAssociated
		}
	}

	/**
	 * 返回样式数据
	 */

	public styleContent(): { [key: string]: string } {
		return {
			'background-color': this.bgColor,
			'border-color': this.borderColor,
			'border-style': this.borderStyle,
			'border-width': `${this.borderNumber}px`,
			'border-radius': `${this.ltRadius}px ${this.rtRadius}px ${this.rbRadius}px ${this.lbRadius}px`
		}
	}


}

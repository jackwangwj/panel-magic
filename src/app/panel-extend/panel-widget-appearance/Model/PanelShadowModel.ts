import { Subject } from "rxjs";
import { BaseValueChangeClass } from "app/baseClass";

/**
 * 阴影数据模型
 */
export class PanelShadowModel extends BaseValueChangeClass<PanelShadowModel>{

	private _color : string = '#000';
	private _x : number = 0;
	private _y : number = 0;
	private _fuzzy : number = 0;
	private _spread : number = 0;

	// 扩散
	public get spread() : number { return this._spread }
	public set spread(v : number) {
		this._spread = v;
		this.valueChange$.next(this)
	}

	// 模糊
	public get fuzzy() : number { return this._fuzzy }
	public set fuzzy(v : number) {
		this._fuzzy = v;
		this.valueChange$.next(this)
	}

	public get y() : number { return this._y }
	public set y(v : number) {
		this._y = v;
		this.valueChange$.next(this)
	}

	public get x() : number { return this._x }
	public set x(v : number) {
		this._x = v;
		this.valueChange$.next(this)
	}

	// 阴影颜色
	public get color() : string { return this._color }
	public set color(v : string) {
		this._color = v;
		this.valueChange$.next(this)
	}


	constructor() { super() }

	/**
	 * 初始化值
	 */
	public resetData(): void {
		this.color =  '#000';
		this.x =  0;
		this.y =  0;
		this.fuzzy =  0;
		this.spread =  0;
	}

	/**
	 * 赋值
	 */
	public setData( data: {
		color?: string,
		x?: number,
		y?: number,
		fuzzy?: number,
		spread?: number
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
		color: string,
		x: number,
		y: number,
		fuzzy: number,
		spread: number
	} {
		return {
			color: this.color,
			x: this.x,
			y: this.y,
			fuzzy: this.fuzzy,
			spread: this.spread
		}
	}

	/**
	 * 返回样式属性
	 */
	public styleContent(): { [key: string]: string } {
		return {
			'box-shadow': `${this.x}px ${this.y}px ${this.fuzzy}px ${this.spread}px ${this.color}`
		}
	}



}

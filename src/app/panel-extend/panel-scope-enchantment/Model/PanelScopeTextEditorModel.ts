import { Subject, BehaviorSubject } from "rxjs";

/**
 * 文字编辑器模式数据模型
 */
export class PanelScopeTextEditorModel{

	public textValueChange$: Subject<string> = new Subject<string>();

	public width: number = 0;
	public height: number = 0;
	public left: number = 0;
	public top: number = 0;
	public borderNumber: number = 0;
	public textAlign: 'left' | 'center' | 'right' = 'left';
	public fontSize: number = 12;
	public fontWeight: 'normal' | 'bold' = 'normal';
	public fontStyle: 'normal' | 'italic' = 'normal';
	public textDecoration: 'initial' | 'underline' | 'line-through' = 'initial';
	public lineHeight: number = 0;
	// 字体颜色
	public color: string = ''

	// 要显示的文本
	private _text : string = '';
	public get text() : string { return this._text }
	public set text(v : string) {
		this._text = v;
		this.textValueChange$.next(this.text)
	}

	constructor(){}

	/**
	 * 重置
	 */
	public resetData(): void {
		this.width =  0;
		this.height =  0;
		this.left =  0;
		this.top =  0;
		this.borderNumber =  0;
		this.textAlign =  'left';
		this.fontSize =  12;
		this.fontWeight = 'normal';
		this.fontStyle = 'normal';
		this.textDecoration = 'initial';
		this.lineHeight =  0;
		this.color =  '';
		this.text =  '';
	}


	/**
	 * 设置样式
	 */
	public setData( data: {
		width?: number,
		height?: number,
		left?: number,
		top?: number,
		borderNumber?: number,
		textAlign?: 'left' | 'center' | 'right',
		fontSize?: number,
		fontWeight?: 'normal' | 'bold',
		fontStyle?: 'normal' | 'italic',
		textDecoration?: 'initial' | 'underline' | 'line-through',
		lineHeight?: number,
		color?: string,
		text?: string,
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
	 * 返回样式
	 */

	public get styleContent() : {[key: string]: string} {
		return {
			width: `${this.width}px`,
			height: `${this.height}px`,
			left: `${this.left}px`,
			top: `${this.top}px`,
			'border': `${this.borderNumber}px solid transparent`,
			'text-align': this.textAlign,
			'font-size': `${this.fontSize}px`,
			'line-height': `${this.lineHeight}px`,
			'font-weight': this.fontWeight,
			'font-style': this.fontStyle,
			'text-decoration': this.textDecoration,
			color: this.color,
		}
	}



}

import { Component, OnInit, ViewEncapsulation, forwardRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subscription } from 'rxjs'
import { ColorEvent } from 'ngx-color';

const DefaultColorList = [
	'transparent','#ffffff','#ff464e','#f2a35d','#feca48',
	'#00d2a3','#58c9f5','#548fee','#766fe9','#000000'
]

@Component({
	selector: 'app-my-color-picker',
	templateUrl: './my-color-picker.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./my-color-picker.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MyColorPickerComponent),
			multi: true
		}
	]
})
export class MyColorPickerComponent implements OnInit, ControlValueAccessor {
	// 当前的颜色色值
	public color: string = '#000'
	// 可选择的默认颜色色值选项
	public defaultColorList: Array<string> = DefaultColorList

	private onChangeCallback: (_: any) => void = () => {}

	// 宽度
	@Input()
	public width: string = '180px'

	// 是否需要显示默认颜色选项
	@Input()
	public isDefaultColor: boolean = true

	// 色板位置
	@Input()
	public panelPosition: string = 'bottom'

	// 大小
	@Input()
	public size: 'small' | 'normal' = 'normal'

	get value(): any {
		return this.color
	}

	set value(v: any) {
		if (v !== this.color) {
			this.color = v
			this.onChangeCallback(v)
		}
	}

	constructor() {}

	ngOnInit() {}

	/**
	 * 接收颜色选择的变化
	 */
	public changeComplete(color: ColorEvent ): void {
		this.value = color.color.hex
	}

	/**
	 * 实现ControlValueAccessor, 双向绑定
	 */
	writeValue(val: string): void {
		if (val !== this.color) {
			this.color = val
		}
	}
	registerOnChange(fn: any): void {
		this.onChangeCallback = fn
	}
	registerOnTouched(fn: any): void {
		//此处无用
	}
}

import { Directive, Output, EventEmitter } from '@angular/core';

export type TYPE = 'enter' | 'out' | string;

// 监听鼠标的移入和移出并返回对应的type
@Directive({
	selector: '[nrMouseMoveOut]',
	host: {
		'(mouseenter)': "listenMouse('enter')",
		'(mouseleave)': "listenMouse('out')"
	}
})
export class MousemoveoutDirective {

	@Output()
	public emitMouseType: EventEmitter<TYPE> = new EventEmitter<TYPE>()

	constructor() { }

	/**
	 * @author GR-03
	 * @copyright 监听元素的移入和移出事件
	 * @param     [param]
	 * @return    [return]
	 * @param     {TYPE}      type [description]
	 */
	public listenMouse( type: TYPE ): void {
		this.emitMouseType.emit( type )
	}

}

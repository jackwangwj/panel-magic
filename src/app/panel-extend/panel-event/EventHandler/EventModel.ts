import { Subject } from "rxjs";

// 事件基类
export class EventModel {

	public readonly valueChange$: Subject<EventModel> = new Subject()

	// 事件处理程序
	public eventHandler: string = ''
	// 事件处理参数
	public eventParams: {[key: string]: string} = null

	constructor() {}

	public get autoWidgetEvent() : {
		eventHandler: string,
		eventParams: { [key: string]: string }
	} {
		return { eventHandler: this.eventHandler, eventParams: this.eventParams }
	}


	public setData( data: {
		eventHandler?: string,
		eventParams?: { [key: string]: string }
	} ): void {
		if( data ) {
			for (let e in this) {
				if ((<Object>data).hasOwnProperty(e)) {
					this[e] = (<any>data)[e]
				}
			}
		}
	}

	public reset(): void {
		this.eventHandler = ''
		this.eventParams = null
	}

}

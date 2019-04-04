import { EventModel } from './EventModel'

// 跳转小程序
export class TapToXcxHandler extends EventModel{


	private _xcxAppid : string = '';
	private _xcxPageUrl: string = '';

	public get xcxAppid() : string { return this._xcxAppid; }
	public set xcxAppid(v : string) {
		this._xcxAppid = v;
		this.setData({ eventParams: { xcx_appid: this.xcxAppid, xcx_page_url: this.xcxPageUrl} })
	}


	public get xcxPageUrl() : string { return this._xcxPageUrl; }
	public set xcxPageUrl(v : string) {
		this._xcxPageUrl = v;
		this.setData({ eventParams: { xcx_appid: this.xcxAppid, xcx_page_url: this.xcxPageUrl } })
	}


	constructor() {
		super()
		this.setData({ eventHandler: 'tapToXcxHandler' })
	}

}

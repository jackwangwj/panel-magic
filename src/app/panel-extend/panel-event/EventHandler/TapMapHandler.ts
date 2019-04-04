import { EventModel } from "./EventModel";
import { IMarkersable } from "../tap-features-handler/map-handler/Model";

/**
 * 地图事件数据模型
 */
export class TapMapHandler extends EventModel  {

	private _markersable: IMarkersable;
	public get markersable() : IMarkersable {
		return this._markersable;
	}
	public set markersable(v : IMarkersable) {
		this._markersable = v;
		this.setData({
			eventParams: {
				latitude: v.latitude + '',
				longitude: v.longitude + '',
				name: v.name,
				desc: v.desc
			}
		})
	}

	constructor() {
		super()
		this.setData({ eventHandler: 'tapToMapHandler' })
	}

}

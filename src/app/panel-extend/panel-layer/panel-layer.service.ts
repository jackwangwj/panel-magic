import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { SoulLayerModel } from './Model'
import { PanelWidgetModel } from '../panel-widget/Model';

@Injectable({
	providedIn: 'root'
})
export class PanelLayerService {

	// widget组件的移入和移除可观察对象
	public launchMouseEnterOut: BehaviorSubject<{ widget: PanelWidgetModel, type: 'enter' | 'out' }> = new BehaviorSubject(null)

	// 图层和组件库数据模型
	public soulLayerModel: SoulLayerModel = new SoulLayerModel()

	constructor() { }

}

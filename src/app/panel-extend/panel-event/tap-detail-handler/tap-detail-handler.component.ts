import { Component, OnInit } from '@angular/core'
import { TapDetailHandlerService } from './tap-detail-handler.service';
import { IPrepareOption, handlePrepareList, TFeaturesSoul } from './Model/HandlePrepare.option';

@Component({
	selector: 'app-tap-detail-handler',
	templateUrl: './tap-detail-handler.component.html',
	styleUrls: ['./tap-detail-handler.component.scss']
})
export class TapDetailHandlerComponent implements OnInit {

	// 待选择的详情列表
	public handlePrepareList: IPrepareOption[] = handlePrepareList

	public get currentFeatures(): TFeaturesSoul {
		return this.tapDetailHandlerService.currentFeatures$.value
	}

	constructor(
		private tapDetailHandlerService: TapDetailHandlerService
	) {}

	ngOnInit() {}

	/**
	 * 接收选中的某一个待功能的事件
	 */
	public acceptPrepareCheck(data: IPrepareOption): void {
		this.tapDetailHandlerService.currentFeatures$.next(data.type)
	}

}

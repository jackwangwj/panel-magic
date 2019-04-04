import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';
import { TFeaturesSoul } from './Model/HandlePrepare.option';

@Injectable({
	providedIn: 'root'
})
export class TapFeaturesHandlerService {

	// 当前选中的功能Type
	public currentFeatures$: BehaviorSubject<TFeaturesSoul> = new BehaviorSubject<TFeaturesSoul>('Map')

	constructor() {}
}

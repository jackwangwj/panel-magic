import { Injectable } from '@angular/core'
import { BehaviorSubject, timer, Observable } from 'rxjs';
import { ProductDetailModel } from './Model';
import { HsDetailsService } from 'app/service';
import { map } from 'rxjs/operators';
import { get }	from 'lodash'

@Injectable({
	providedIn: 'root'
})
export class ProductHandlerService {

	// 搜索词
	public searchValue: string = '';

	// 页码
	public page: number = 1;

	// 待选择的产品列表
	public productAwaitList$: BehaviorSubject<Array<ProductDetailModel>> = new BehaviorSubject([])

	// 当前选中的产品
	public currentProductInfo$: BehaviorSubject<ProductDetailModel> = new BehaviorSubject(null)

	// 是否有下一页
	public isNextPage: boolean = false

	// 是否显示loading效果
	public isVisebleLoading: boolean = false

	constructor(
		private hsDetailsService: HsDetailsService
	) {}


	// 获取产品列表
	public acquireProductList(): Observable<ProductDetailModel[]> {
		this.isVisebleLoading = true;
		this.isNextPage = false
		return this.hsDetailsService.getProductHandlerList({
			name: this.searchValue,
			page: this.page
		}).pipe(
			map(res => {
				this.isVisebleLoading = false
				if (res.status === 1) {
					const _data = res.data.data;
					if (Array.isArray(_data)) {
						let _arr: ProductDetailModel[] = [];
						_data.forEach(_e => {
							_arr.push(new ProductDetailModel(<ProductDetailModel>{
								id	  : get(_e, 'id'),
								name  : get(_e, 'title'),
								thumb : get(_e, 'thumb')
							}))
						});
						if (res.data.next_page_url) {
							this.isNextPage = true
						}
						return _arr
					}else {
						return []
					}
				}else {
					return []
				}
			})
		)
	}

	/**
	 * 获取某个内容的详情信息
	 */
	public acquireProductInfo( id: string ): Observable<ProductDetailModel> {
		return this.hsDetailsService.getDetailInfo({
			id: id
		}).pipe(
			map(res=>{
				if( res.status === 1 ) {
					const _data = res.data;
					return new ProductDetailModel(<ProductDetailModel>{
						id: get(_data,'id'),
						name: get(_data,'title'),
						thumb: get(_data,'thumb'),
						intro: get(_data,'description')
					})
				}else {
					return null;
				}
			})
		)
	}

}

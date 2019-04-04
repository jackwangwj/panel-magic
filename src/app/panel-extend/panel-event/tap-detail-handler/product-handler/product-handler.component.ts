import { Component, OnInit, OnDestroy } from '@angular/core'
import { ProductHandlerService } from './product-handler.service';
import { ProductDetailModel } from './Model';
import { Subscription } from 'rxjs';
import { PanelEventService } from '../../panel-event.service';
import { TapProductDetailHandler } from '../../EventHandler';
import { EnumEventHandler } from '../../Model';

@Component({
	selector: 'app-product-handler',
	templateUrl: './product-handler.component.html',
	styleUrls: ['./product-handler.component.scss']
})
export class ProductHandlerComponent implements OnInit, OnDestroy {
	private isShowEventSite$: Subscription
	// 是否显示选择产品的抽屉
	public isVisebleDrawer: boolean = false

	public get searchValue() : string {
		return this.productHandlerService.searchValue
	}
	public set searchValue(v : string) {
		this.productHandlerService.searchValue = v
	}

	public get isVisebleLoading() : boolean {
		return this.productHandlerService.isVisebleLoading
	}

	public get isNextPage() : boolean {
		return this.productHandlerService.isNextPage
	}

	public get productAwaitList() : Array<ProductDetailModel> {
		return this.productHandlerService.productAwaitList$.value
	}

	public get currentProductInfo() : ProductDetailModel {
		return this.productHandlerService.currentProductInfo$.value
	}

	// 产品详情事件
	public currentTapProductDetailHandler: TapProductDetailHandler = new TapProductDetailHandler()

	// 抽屉高度
	public get drawerHeight() : number {
		return window.innerHeight - 100
	}

	constructor(
		private productHandlerService: ProductHandlerService,
		private panelEventService: PanelEventService
	) {
		this.isShowEventSite$ = this.panelEventService.eventSiteModel.isVisibleModal$.subscribe(b => {
			if (b == true) {
				const _inset_widget = this.panelEventService.currentPanelWidgetModel
				if (_inset_widget) {
					const _auto_event = _inset_widget.panelEventHandlerModel;
					if (_auto_event && _auto_event.eventHandler == 'tapProductDetailHandler') {
						const _product_id = _auto_event.eventParams.id;
						this.panelEventService.launchCurrentEventIndex$.next(EnumEventHandler['tapDetailHandler'])
						this.productHandlerService.acquireProductInfo(_product_id).subscribe(pro=>{
							console.log(pro,'pro')
							this.productHandlerService.currentProductInfo$.next(pro)
						})
					}
				};
			} else {
				this.currentTapProductDetailHandler = new TapProductDetailHandler();
				this.productHandlerService.currentProductInfo$.next(null);
			}
		});
	}

	ngOnInit() {}

	ngOnDestroy() {
		if (this.isShowEventSite$) this.isShowEventSite$.unsubscribe()
	}

	/**
	 * 抽屉的取消操作
	 */
	public handleCloseDrawer(): void {
		this.isVisebleDrawer = false;
		this.productHandlerService.currentProductInfo$.next(null);
	}

	/**
	 * 接收加载更多按钮
	 */
	public addMoreProduct(): void {
		this.productHandlerService.page += 1;
		this.productHandlerService.acquireProductList().subscribe(list => {
			const _list_value = this.productHandlerService.productAwaitList$.value;
			this.productHandlerService.productAwaitList$.next(_list_value.concat(list))
		})
	}

	/**
	 * 弹出选择产品的列表
	 */
	public acceptOpenProductModal(): void {
		this.productHandlerService.page = 1;
		this.productHandlerService.searchValue = '';
		this.productHandlerService.acquireProductList().subscribe(list=>{
			this.productHandlerService.productAwaitList$.next(list)
		})
		this.isVisebleDrawer = true;
	}

	/**
	 * 搜索某个产品
	 */
	public searchProductList(): void {
		this.productHandlerService.page = 1;
		this.productHandlerService.acquireProductList().subscribe(list => {
			this.productHandlerService.productAwaitList$.next(list)
		})
	}

	/**
	 * 点击选中某一个产品数据的函数
	 */
	public checkProduct( data: ProductDetailModel ): void {
		this.productHandlerService.currentProductInfo$.next(data)
	}

	/**
	 * 点击确定选中某一个产品的数据
	 */
	public handleOkDrawer(): void {
		this.isVisebleDrawer = false;
		this.currentTapProductDetailHandler.productId = this.currentProductInfo.id;
		this.currentTapProductDetailHandler.productName = this.currentProductInfo.name;
		this.panelEventService.eventSiteModel.currentEventModel$.next(this.currentTapProductDetailHandler)
	}

}

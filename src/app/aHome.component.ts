import {
	Component,
	Renderer2,
	OnDestroy,
	OnInit
} 	from '@angular/core';
import {
    Router,
    RouterEvent,
    NavigationEnd,
	ActivatedRoute
} 	from '@angular/router'
import { Subscription }	from 'rxjs/Subscription'

import { animations }	from './public/animations'

import { ImageGalleryService } from '@ng-public/image-gallery/image-gallery.service';

@Component({
	selector: 'app-home',
	template: `
		<div class="main" id="main" [ngStyle]="{'filter': isVisibleImageDrawer ? 'blur(6px)' : '' }">
			<!-- 头部组件 -->
			<div class="aside-top">
				<div class="component-top-navbar" id="panel-top">
					<app-top-navbar></app-top-navbar>
				</div>
			</div>

			<!-- 视图主体部分 -->
			<div class="aside-main">

				<!-- 内容主体部分 -->
				<div class="component-main"
					id="component-main"
					[ngStyle]="{left:0,top:0,right:0}">
					<app-panel-extend></app-panel-extend>
				</div>

			</div>

		</div>
		<!-- 选择图片组件 -->
		<app-image-gallery></app-image-gallery>
	`,
	styleUrls: ['./app.component.scss'],
	animations: [animations.rightIn, animations.fadeIn]
})
export class HomeComponent implements OnInit, OnDestroy {

	// 订阅页面状态变化
	private activeRouterRX$: Subscription

	public get isVisibleImageDrawer() : boolean {
		return this.imageGalleryService.isVisibleImageDrawer$.value;
	}

	constructor(
		private renderer: Renderer2,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private imageGalleryService: ImageGalleryService
	) {
		// 监听路由变化
		this.router.events.subscribe((evt: RouterEvent) =>
			this.resolveRouter(evt)
		)
		this.activeRouterRX$ = this.activatedRoute.data.subscribe(data=>{
			console.log(data,'data')
		})
	}

	ngOnInit() {}

	ngOnDestroy() {
		if (this.activeRouterRX$) this.activeRouterRX$.unsubscribe();
	}

	/**
	 * @author GR-03
	 * @copyright 监听路由变化然后对loading效果进行设置
	 * @param     [param]
	 * @return    [return]
	 * @param     {RouterEvent} evt [description]
	 */
	public resolveRouter(evt: RouterEvent): void {
		if (evt instanceof NavigationEnd) {
			let ele = document.querySelector('#GLOBALLOADING')
			this.renderer.setStyle(ele, 'display', 'none')
		}
	}
}

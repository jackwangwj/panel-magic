import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TapDetailHandlerComponent } from './tap-detail-handler.component'
import { ShareModule } from '@ng-share'
import { TapDetailHandlerService } from './tap-detail-handler.service'
import { ProductHandlerComponent } from './product-handler/product-handler.component'
import { ArticleHandlerComponent } from './article-handler/article-handler.component'
import { ProductHandlerService } from './product-handler/product-handler.service'

@NgModule({
	imports: [CommonModule, ShareModule],
	providers: [TapDetailHandlerService, ProductHandlerService],
	exports: [TapDetailHandlerComponent],
	declarations: [
		TapDetailHandlerComponent,
		ProductHandlerComponent,
		ArticleHandlerComponent
	]
})
export class TapDetailHandlerModule {}

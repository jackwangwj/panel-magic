import { NgModule } from '@angular/core'

import { FileUrlPipe } from './fileUrl.pipe'
import { JsonParsePipe } from './jsonParse.pipe'
import { SafeInnerHtmlPipe } from './safeInnerHtml.pipe'

@NgModule({
	declarations: [SafeInnerHtmlPipe, FileUrlPipe, JsonParsePipe],
	exports: [SafeInnerHtmlPipe, FileUrlPipe, JsonParsePipe],
	providers: [SafeInnerHtmlPipe, FileUrlPipe, JsonParsePipe]
})
export class PipesModule {}

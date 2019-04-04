import {
    Component,
    OnInit,
    Input}   from '@angular/core';

import { ImageGalleryService }    from '@ng-public/image-gallery/image-gallery.service'
import { WidgetModel } from '../../../Model/WidgetModel';

@Component({
    selector: 'app-rich-text-site-view',
    templateUrl: './rich-text-site-view.component.html',
    styleUrls: ['./rich-text-site-view.component.scss']
})
export class RichTextSiteViewComponent implements OnInit {

	private _autoWidget: WidgetModel = new WidgetModel();

    @Input()
    public get autoWidget(): WidgetModel {
        return this._autoWidget;
    }
    public set autoWidget(v: WidgetModel) {
        this._autoWidget = v;
    }

    constructor(
    ) { }

    ngOnInit() { }

    ngOnDestroy() { }

}

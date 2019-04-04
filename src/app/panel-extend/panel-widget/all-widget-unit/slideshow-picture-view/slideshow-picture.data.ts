import { PanelWidgetModel } from "../../Model";
import { OrientationModel } from "../../Model/OrientationModel";
import { PictureAdModel } from "./slideshow-picture-site-view/picture-ad-image-item/Model";
import { HostItemModel } from "../../Model/HostModel";

export const slideshowpictureWidget = new PanelWidgetModel(<HostItemModel>{
	type: 'slideshowpicture',
	name: '轮播图',
	component: 'SlideshowPictureViewComponent',
	icon: 'xiaochengxu-zujian-3',
	autoWidget: {
		type: 'slideshowpicture',
		content: {
			pictureAdModel: new PictureAdModel(),
			templateType: 1
		},
		orientationmodel: new OrientationModel(<OrientationModel>{ width: 414, height: 200 }),
		customfeature: {
		},
		style: {
			data: {},
			children: [
			]
		}
	}
})

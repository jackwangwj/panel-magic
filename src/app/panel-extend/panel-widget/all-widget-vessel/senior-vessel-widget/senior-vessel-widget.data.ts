import { PanelWidgetModel } from '../../Model'
import { OrientationModel } from '../../Model/OrientationModel'
import { VesselWidgetModel } from 'app/panel-extend/panel-senior-vessel-edit/Model';
import { HostItemModel } from '../../Model/HostModel';

export const seniorVesselWidget = new PanelWidgetModel(<HostItemModel>{
	type: 'seniorvessel',
	name: '动态容器',
	component: 'SeniorVesselWidgetComponent',
	icon: 'xiaochengxu-zujian-1',
	autoWidget: {
		type: 'seniorvessel',
		content: {
			vesselWidget: new VesselWidgetModel()
		},
		customfeature: {
			eventParams: null,
			eventHandler: ''
		},
		orientationmodel: new OrientationModel(<OrientationModel>{ width: 360, height: 200 }),
		style: {
			data: {},
			children: []
		}
	}
})

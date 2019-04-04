import { HomeComponent } from './aHome.component'

// 详情守卫，必须要有对应的小程序id才可以进入该页面
import { HsXcxCanActivate } from './service/hs-xcx/hs-xcx.activate.service'

export const AppRoutes = [
	{
		path: ':id',
		data: { type: 'normal' },
		canActivate: [HsXcxCanActivate],
		component: HomeComponent
	},
	{
		path: '',
		data: { type: 'normal' },
		canActivate: [HsXcxCanActivate],
		redirectTo: 'mock',
		pathMatch: 'full'
	},
	{
		path: "**",
		redirectTo: 'mock',
		pathMatch: 'full'
	}
];


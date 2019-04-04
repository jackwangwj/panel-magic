import { HomeComponent }	from './aHome.component'

// 详情守卫，必须要有对应的小程序id才可以进入该页面
import { HsXcxCanActivate }	from './service/hs-xcx/hs-xcx.activate.service'

export const AppRoutes=[
	// {
	// 	path:'template',
	// 	component: AppComponent,
	// 	children: [
	// 		{
	// 			path:':id',
	// 			data: { type: 'template' },
	// 			canActivate: [ HsXcxCanActivate ],
	// 			component: HomeComponent
	// 		}
	// 	]
	// },
	{
		path:'template/:id',
		data: { type: 'template' },
		canActivate: [ HsXcxCanActivate ],
		component: HomeComponent
	},
	{
		path:':id',
		data: { type: 'normal' },
		canActivate: [ HsXcxCanActivate ],
		component: HomeComponent
	},
	{
		path:'',
		data: { type: 'normal' },
		canActivate: [ HsXcxCanActivate ],
		redirectTo:'',
		pathMatch:'full'
	},
	{
		path:"**",
		redirectTo:'',
		pathMatch:'full'
	}
];


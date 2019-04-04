/**
 * 预备待选择的详情列表
 */

/**
 * 详情事件类型定义
 * 'Product': 产品详情
 * 'Article': 文章详情
 */
export type TFeaturesSoul = 'Product' | 'Article'

export interface IPrepareOption {
	icon: string
	name: string
	type: TFeaturesSoul
}

export const handlePrepareList: IPrepareOption[] = [
	{
		icon: 'xiaochengxu-ditu1',
		name: '产品详情',
		type: 'Product'
	},
	// {
	// 	icon: 'xiaochengxu-ditu1',
	// 	name: '文章详情',
	// 	type: 'Article'
	// }
]

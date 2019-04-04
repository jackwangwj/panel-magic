import { NavigationModel }	from './NavigationModel'

/**
 * 记录底部导航组件需要的数据
 */
export class TabbarModel {

	// 导航的列表数据
	public navList : Array<NavigationModel>;
	// 初始文字颜色
	public initColor : string;
	// 选中的文字颜色
	public checkColor : string;

	constructor( obj: any = {} ){
		this.initData()
		this.setData( obj )
	}

	/**
	 * @author GR-03
	 * @copyright 赋值数据
	 * @param     [param]
	 * @return    [return]
	 * @param     {any}       obj [description]
	 */
	public setData( obj: any ): void {
		if( obj && Object.keys( obj ).length > 0 ) {
			this.checkColor = obj['checkColor']
			this.initColor = obj['initColor']
			this.navList = ((): Array<NavigationModel>=>{
				let _obj = []
				obj['navList'].forEach(_e=>{
					_obj.push( new NavigationModel(_e) )
				})
				return _obj
			})()
		}
	}

	/**
	 * @author GR-03
	 * @copyright 初始化数据
	 * @param     [param]
	 * @return    [return]
	 */
	public initData(): void {
		this.navList 	= [ new NavigationModel() , new NavigationModel() ]
		this.initColor 	= '#000'
		this.checkColor = '#000'
	}

	/**
	 * @author GR-03
	 * @copyright 添加导航的函数
	 * @param     [param]
	 * @return    [return]
	 */
	public addNavList(): void {
		this.navList.push( new NavigationModel() )
	}

	/**
	 * @author GR-03
	 * @copyright 删除某一个导航的函数
	 * @param     [param]
	 * @return    [return]
	 * @param     {number}    index [description]
	 */
	public delNavList( index: number ): void {
		this.navList.splice( index, 1 )
	}

}

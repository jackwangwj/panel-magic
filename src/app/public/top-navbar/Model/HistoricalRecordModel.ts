interface recordable {
	id: number,
	add_time: string
}

export class HistoricalRecordModel{

	// 历史记录表
	private _recordList : Array<recordable>;
	// 是否还有下一页的数据
	private _isNext : boolean;
	// 页数
	private _page : number;
	// 是否显示loading状态
	private _isLoading : boolean;
	// 滚动到某个位置时懒加载
	private _scrollTopNumber : number;

	public get scrollTopNumber() : number {
		return this._scrollTopNumber;
	}
	public set scrollTopNumber(v : number) {
		this._scrollTopNumber = v;
	}

	public get isLoading() : boolean {
		return this._isLoading;
	}
	public set isLoading(v : boolean) {
		this._isLoading = v;
	}


	public get page() : number {
		return this._page;
	}
	public set page(v : number) {
		this._page = v;
	}

	public get isNext() : boolean {
		return this._isNext;
	}
	public set isNext(v : boolean) {
		this._isNext = v;
	}

	public get recordList() : Array<recordable> {
		return this._recordList;
	}
	public set recordList(v : Array<recordable>) {
		this._recordList = v;
	}

	constructor() {
		this.initData()
	}

	/**
	 * @author GR-03
	 * @copyright 初始化数据
	 * @param     [param]
	 * @return    [return]
	 */
	public 	initData(): void {
		this.recordList = []
		this.isNext = false
		this.isLoading = true
		this.page = 1
		this.scrollTopNumber = 50
	}


}
import {
	Component,
	OnInit,
	Input,
	OnChanges,
	SimpleChanges
} from '@angular/core'
import { environment } from 'environments/environment'

@Component({
	selector: 'ng-thumb-auto',
	templateUrl: './ng-thumb-auto.component.html',
	styleUrls: ['./ng-thumb-auto.component.scss']
})
export class MgrThumbAutoComponent implements OnInit, OnChanges {
	private _isDomainUrl: boolean = true
	//类型  错误时加载图片还是图标、灰色块
	@Input() type: 'ICON' | 'IMG' | 'PURE'
	//源图片地址
	@Input() imgSrc: string
	//type = ICON 时的图标标示
	@Input() iconErr: string
	//type = IMG 时的图片地址
	@Input() imgErr: string = '/assets/image/default.png'
	//icon 大小
	@Input() iconSize: number = 50
	//图片宽度 默认100%
	@Input() imgSize: number
	//图片圆形
	@Input() circular: boolean
	//居中是否
	@Input() justify: 'left' | 'center'
	//图片是否需要移动上 可预览
	@Input() showPreview: boolean
	// 是否显示边框
	@Input() isShowBorder: boolean

	@Input() fileUrl: string
	// 是否允许线上模式携带home目录
	@Input() isHasHome: boolean = true

	// 是否携带域名
	@Input()
	public set isDomainUrl(v: boolean) {
		this._isDomainUrl = v
		if (v == false) this.fileUrl = ''
	}
	public get isDomainUrl(): boolean {
		return this._isDomainUrl
	}

	imgLoadErr: boolean

	constructor() {
		this.type = 'IMG'
		this.justify = 'center'
		if (this.isDomainUrl) {
			if (environment.production) {
				this.fileUrl = environment.fileurl
			} else {
				this.fileUrl = environment.fileurl
			}
		} else {
			this.fileUrl = ''
		}
	}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.imgSrc) {
			this.imgLoadErr = false
		}
		if (changes.fileUrl) {
			if (this.isDomainUrl) {
				if (changes.fileUrl.currentValue) {
					this.fileUrl = changes.fileUrl.currentValue
				} else {
					this.fileUrl = environment.fileurl
				}
			} else {
				this.fileUrl = ''
			}
		}
	}
}

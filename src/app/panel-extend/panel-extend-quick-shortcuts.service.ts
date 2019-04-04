import { NgZone, Injectable, ElementRef } from '@angular/core';
import { PanelScopeEnchantmentService } from './panel-scope-enchantment/panel-scope-enchantment.service';
import { ScopeEnchantmentModel, PanelInfoModel } from './Model';
import { PanelExtendService } from './panel-extend.service';
import { BehaviorSubject, Subject, fromEvent, Subscription, Observable } from 'rxjs';
import { PanelWidgetModel } from './panel-widget/Model';
import { PanelExtendMoveBackService } from './panel-extend-move-back.service';
import { PanelAssistArborService } from './panel-assist-arbor/panel-assist-arbor.service';
import { DraggablePort } from '@ng-public/directive/draggable/draggable.interface';
import { PanelScaleplateService } from './panel-scaleplate/panel-scaleplate.service';
import { DraggableTensileCursorService } from './panel-scope-enchantment/draggable-tensile-cursor.service';
import { cloneDeep, get }	from 'lodash'
import { NzMessageService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HsFileService } from 'app/service';
import { AppService } from 'app/app.service';
import { ImageModel } from '@ng-public/image-gallery/Model';
import { PanelSoulService } from './panel-soul/panel-soul.service';
import { PanelSeniorVesselEditService } from './panel-senior-vessel-edit/panel-senior-vessel-edit.service';
import { AppDataService } from 'app/appdata/app-data.service';
import { panelWidgetComponentObj } from './panel-widget/all-widget-container';
import { TopNavbarService } from '@ng-public/top-navbar/top-navbar.service';
import { HostItemModel } from './panel-widget/Model/HostModel';

@Injectable({
	providedIn: 'root'
})
export class PanelExtendQuickShortcutsService {

	// 键盘按下的操作监听
	private listenKeyboardDown$: Subscription
	// 键盘弹起的操作监听
	private listenKeyboardUp$: Subscription

	public get widgetList$(): BehaviorSubject<Array<PanelWidgetModel>> {
		return this.panelExtendService.widgetList$
	}
	public get panelInfo(): PanelInfoModel {
		return this.panelExtendService.panelInfoModel
	}
	public get scopeEnchantmentModel(): ScopeEnchantmentModel {
		return this.panelScopeEnchantmentService.scopeEnchantmentModel
	}

	constructor(
		private zone: NgZone,
		private panelExtendService: PanelExtendService,
		private nzMessageService: NzMessageService,
		private draggableTensileCursorService: DraggableTensileCursorService,
		private panelSeniorVesselEditService: PanelSeniorVesselEditService,
		private hsFileService: HsFileService,
		private appDataService: AppDataService,
		private httpClient: HttpClient,
		private appService: AppService,
		private panelScaleplateService: PanelScaleplateService,
		private topNavbarService: TopNavbarService,
		private panelSoulService: PanelSoulService,
		private panelAssistArborService: PanelAssistArborService,
		private panelExtendMoveBackService: PanelExtendMoveBackService,
		private panelScopeEnchantmentService: PanelScopeEnchantmentService
	) {}

	/**
	 * 获取浏览器的粘贴面板数据
	 */
	public subClipboardPaste(): Observable<File> {
		return fromEvent(document, 'paste').pipe(
			map((res: ClipboardEvent) => {
				if (res.clipboardData && res.clipboardData.items) {
					for (let i = 0, len = res.clipboardData.items.length; i < len; i++) {
						let item = res.clipboardData.items[i];
						if (item.kind === 'file') {
							let _pasteFile = item.getAsFile()
							return _pasteFile;
						}
					};
				}else {
					return null
				}
			})
		)
	}

	/**
	 * 清空浏览器粘贴板数据
	 */
	public clearClipboardPaste(): Observable<boolean> {
		return fromEvent(document, 'copy').pipe(
			map((res: ClipboardEvent)=>{
				if (res.clipboardData && res.clipboardData.items) {
					res.clipboardData.setData('file', null)
					res.preventDefault();
					return true
				}else {
					return false
				}
			})
		)
	}

	/**
	 * 开启键盘事件监听
	 */
	public openKeyboardEvent(): void {
		this.closeKeyboardEvent();
		this.listenKeyboardDown$ = fromEvent(document, 'keydown').subscribe((keyboard: KeyboardEvent)=>{
			this.zone.run(() => {
				// 如果当前获得的焦点标签是输入框且按下了enter键则自动blur；
				if (document.activeElement.tagName == 'INPUT' && keyboard.keyCode == 13 ) {
					document.activeElement['blur']()
				}
				// 如果当前获得的焦点标签不是BODY就关闭键盘事件
				if (document.activeElement.tagName == 'BODY') {
					// 按下了ctr+s 或 command+s 执行保存操作
					if ((keyboard.metaKey == true && keyboard.keyCode == 83) || (keyboard.ctrlKey == true && keyboard.keyCode == 83)) {
						keyboard.preventDefault()
						this.topNavbarService.saveXcxAppData()
					}
					// 按下了ctr+c 或 command+c 执行复制操作
					if ((keyboard.metaKey == true && keyboard.keyCode == 67) || (keyboard.ctrlKey == true && keyboard.keyCode == 67)) {
						this.performCopy()
					}
					// 按下了ctr+v 或command+v 执行粘贴操作
					if ((keyboard.metaKey == true && keyboard.keyCode == 86) || (keyboard.ctrlKey == true && keyboard.keyCode == 86)) {
						this.performPaste()
					}
					// 按下了ctr+a 或command+a 执行全选
					if ((keyboard.metaKey == true && keyboard.keyCode == 65) || (keyboard.ctrlKey == true && keyboard.keyCode == 65)) {
						this.performCheckAll()
					}
					// 按下了ctr+z 或command+z 执行撤销
					if ((keyboard.metaKey == true && keyboard.shiftKey == false && keyboard.keyCode == 90) || (keyboard.ctrlKey == true && keyboard.shiftKey == false && keyboard.keyCode == 90)) {
						this.panelExtendMoveBackService.acquireBackDBData()
					}
					// 按下了ctr+shift+z 或command+shift+z 执行前进
					if ((keyboard.metaKey == true && keyboard.shiftKey == true && keyboard.keyCode == 90) || (keyboard.ctrlKey == true && keyboard.shiftKey == true && keyboard.keyCode == 90)) {
						this.panelExtendMoveBackService.acquireMoveDBData()
					}
					// 按下了ctr+d 或command+d 执行快捷复制粘贴操作
					if ((keyboard.metaKey == true && keyboard.keyCode == 68) || (keyboard.ctrlKey == true && keyboard.keyCode == 68)) {
						keyboard.preventDefault();
						this.performCopy();
						this.performPaste(false)
					}
					// 按下了ctr+x 或command+x 执行剪切操作
					if ((keyboard.metaKey == true && keyboard.keyCode == 88) || (keyboard.ctrlKey == true && keyboard.keyCode == 88)) {
						this.performCutWidget();
					}
					// 按下了ctr+g 或command+g 执行组合
					if ((keyboard.metaKey == true && keyboard.shiftKey == false && keyboard.keyCode == 71) || (keyboard.ctrlKey == true && keyboard.shiftKey == false && keyboard.keyCode == 71)) {
						keyboard.preventDefault()
						this.panelAssistArborService.launchCreateCombination$.next()
					}
					// 按下了ctr+shift+g 或command+shift+g 执行打散组合
					if ((keyboard.metaKey == true && keyboard.shiftKey == true && keyboard.keyCode == 71) || (keyboard.ctrlKey == true && keyboard.shiftKey == true && keyboard.keyCode == 71)) {
						keyboard.preventDefault()
						this.panelAssistArborService.launchDisperseCombination$.next()
					}
					// 按下了ctr+h 或command+h 执行隐藏或显示标尺辅助线操作
					if ((keyboard.metaKey == true && keyboard.keyCode == 72) || (keyboard.ctrlKey == true && keyboard.keyCode == 72)) {
						keyboard.preventDefault()
						this.panelScaleplateService.controlLineShowOrHide()
					}
					// 按下上下左右执行移动
					if ([39, 38, 37, 40].includes(keyboard.keyCode)) {
						this.performFourOrientation(keyboard)
					}
					// 按下了删除键盘
					if (keyboard.keyCode == 8 || keyboard.keyCode == 46) {
						this.performDelWidget()
					}
					// 按下了alt键盘
					if (keyboard.keyCode == 18) {
						this.panelScopeEnchantmentService.isOpenAltCalc$.next(false)
					}
					// 按下了shift键盘
					if (keyboard.keyCode == 16 && keyboard.shiftKey == true) {
						this.draggableTensileCursorService.isOpenConstrainShift$.next(true)
					}
					// 按下了commadn键
					if (keyboard.keyCode == 91 && keyboard.metaKey == true) {
						this.panelScaleplateService.isOpenMoveLine$.next(true)
					}
					// 按下了ctrl键
					if (keyboard.keyCode == 17 && keyboard.ctrlKey == true) {
						this.panelScaleplateService.isOpenMoveLine$.next(true)
					}
					// 按下了空格键
					if (keyboard.keyCode == 32) {
						this.panelExtendService.isOpenSpacebarMove$.next(true)
						console.log(this.panelExtendService.widgetList$.value,'--------',this.appDataService.appDataModel)
					}
					// 按下了esc键
					if (keyboard.keyCode == 27) {
						// this.panelSeniorVesselEditService.exitRoomVessel()
					}
				}
			})
		})
		this.listenKeyboardUp$ = fromEvent(document, 'keyup').subscribe((keyboard: KeyboardEvent) => {
			this.zone.run(() => {
				this.panelScopeEnchantmentService.isOpenAltCalc$.next(true)
				this.panelExtendService.isOpenSpacebarMove$.next(false)
				this.panelScaleplateService.isOpenMoveLine$.next(false)
				this.draggableTensileCursorService.isOpenConstrainShift$.next(false)
				// 如果当前获得的焦点标签不是BODY就关闭键盘事件
				if (document.activeElement.tagName == 'BODY') {
				}
			})
		})
	}

	/**
	 * 取消所有键盘事件监听
	 */
	public closeKeyboardEvent(): void {
		if (this.listenKeyboardDown$) this.listenKeyboardDown$.unsubscribe();
		if (this.listenKeyboardUp$) this.listenKeyboardUp$.unsubscribe();
	}

	/**
	 * 执行复制操作
	 */
	public performCopy(): void {
		const _inset_widget = this.scopeEnchantmentModel.outerSphereInsetWidgetList$.value;
		if (Array.isArray(_inset_widget) && _inset_widget.length > 0 ) {
			const _clip_copy = this.clearClipboardPaste().subscribe(b => { _clip_copy.unsubscribe(); });
			this.panelScopeEnchantmentService.clipboardList$.next(cloneDeep(_inset_widget))
		};
	}

	/**
	 * 执行粘贴操作
	 * isNoneFile参数表示是否不需要粘贴文件,如果为false则直接粘贴组件
	 */
	public performPaste( isNoneFile: boolean = true ): void {
		const _done = ()=>{
			let _posi = { left: 0, top: 0 };
			const _outer = this.scopeEnchantmentModel.valueProfileOuterSphere
			if (_outer) {
				_posi.left = _outer.left + Math.floor(_outer.width / 2);
				_posi.top = _outer.top + _outer.height + Math.floor(_outer.height / 2);
			} else {
				_posi.left = Math.floor(this.panelInfo.width / 2);
				_posi.top = Math.floor(this.panelInfo.height / 2);
			};
			this.performPasteWidgetInPanel(_posi)
		};
		if( isNoneFile ) {
			const _clip_paste = this.subClipboardPaste().subscribe(file=>{
				if( file && file instanceof File ) {
					// 说明浏览器的粘贴板有图片文件，执行（上传 -> 生成widget组件 -> 选中图片组件）
					this.handleForClipboardPasteFile(file)
				}else {
					_done()
				};
				_clip_paste.unsubscribe();
			})
		}else {
			_done()
		}
	}

	/**
	 * 粘贴组件到面板
	 * 如果是组合组件则把组合组件的子集也一并复制一份
	 * 同时筛选出不是部件或动态容器的数据，因为动态容器只允许粘贴普通组件
	 */
	public performPasteWidgetInPanel(position: { left: number, top: number }): void {
		let _clip_list = this.panelScopeEnchantmentService.clipboardList$.value;
		if( this.panelSeniorVesselEditService.isEnterEditVesselCondition$.value ) {
			const _all_container_widget_type = Object.keys(panelWidgetComponentObj);
			_clip_list = _clip_list.filter(_c=>{
				return _all_container_widget_type.includes(_c.type) || _c.type == 'combination'
			});
		};
		if (_clip_list.length == 0) {
			this.nzMessageService.warning('无粘贴内容')
		} else {
			const _copy_c = _clip_list.map(_e=>{
				return new PanelWidgetModel(cloneDeep(_e))
			})
			this.panelExtendService.addPanelWidget(_copy_c);
			this.panelScopeEnchantmentService.pushOuterSphereInsetWidget(_copy_c);
			const _outer_sphere = this.scopeEnchantmentModel.valueProfileOuterSphere
			const _drag_increment = {
				left: position.left - _outer_sphere.left - (Math.floor(_outer_sphere.width / 2)),
				top: position.top - _outer_sphere.top - (Math.floor(_outer_sphere.height / 2))
			};
			this.scopeEnchantmentModel.handleProfileOuterSphereLocationInsetWidget(_drag_increment);
			this.scopeEnchantmentModel.handleLocationInsetWidget(_drag_increment);
		}
	}

	/**
	 * 执行全选操作
	 */
	public performCheckAll(): void {
		this.panelScopeEnchantmentService.pushOuterSphereInsetWidget(this.panelExtendService.valueWidgetList())
	}


	/**
	 * 执行上下左右四个键盘事件的回调
	 * 对应keyCode如下
	 * 右： 39
	 * 上： 38
	 * 左： 37
	 * 下： 40
	 */
	public performFourOrientation(key: KeyboardEvent): void {
		const _scope_enchant = this.scopeEnchantmentModel;
		if (_scope_enchant.valueProfileOuterSphere) {
			const _key_code = key.keyCode;
			const _is_shift: boolean = key.shiftKey;
			const _move = (drag: DraggablePort) => {
				const _pro = _scope_enchant.valueProfileOuterSphere;
				_scope_enchant.valueProfileOuterSphere.setMouseCoord([_pro.left, _pro.top]);
				_scope_enchant.outerSphereInsetWidgetList$.value.map(_e => {
					_e.profileModel.setMouseCoord([_e.profileModel.left, _e.profileModel.top])
				});
				_scope_enchant.handleProfileOuterSphereLocationInsetWidget(drag)
				_scope_enchant.handleLocationInsetWidget(drag);
			};
			const _key_obj = {
				'39': { left: _is_shift ? 10 : 1, top: 0 },
				'38': { left: 0, top: _is_shift ? -10 : -1 },
				'37': { left: _is_shift ? -10 : -1, top: 0 },
				'40': { left: 0, top: _is_shift ? 10 : 1 }
			};
			if (_key_obj[_key_code]) {
				_move(_key_obj[_key_code])
			}
		}
	}

	/**
	 * 删除选中的widget组件
	 */
	public performDelWidget(): void {
		const _scope_enchant = this.scopeEnchantmentModel
		if (_scope_enchant && _scope_enchant.outerSphereInsetWidgetList$.value) {
			const _inset_widget = _scope_enchant.outerSphereInsetWidgetList$.value
			const _inset_widget_nr_id = _inset_widget.map(_e => _e.uniqueId)
			this.panelExtendService.deletePanelWidget(_inset_widget_nr_id)
			this.scopeEnchantmentModel.emptyAllProfile()
		}
	}

	/**
	 * 执行剪切操作
	 */
	public performCutWidget(): void {
		this.performCopy();
		this.performDelWidget();
	}


	/**
	 * 执行图片手动上传操作，然后生成对应的图片组件widget，然后再选中
	 */
	public handleForClipboardPasteFile(file: File): void {
		const _mes_id = this.nzMessageService.loading('文件上传中...',{nzDuration: 0}).messageId;
		const _form_data = new FormData();
		_form_data.append('file',file,file.name);
		const _header = this.appService.getCommonHeader(true, null);
		this.httpClient.post<{ status: number, [key: string]: any }>(this.hsFileService.postUploadURL + '?app_id=' + this.appDataService.appDataModel.app_id, _form_data, {
			headers: _header
		}).subscribe(res=>{
			this.nzMessageService.remove(_mes_id)
			if (res.status === 1) {
				const _data = get(res,'data')
				this.handleCreatePictureWidget(_data)
			}
		},()=>{
			this.nzMessageService.error('上传失败')
		})
	};

	/**
	 * 动态创建图片组件，并自动贴上粘贴上传好的图片路径，并选中
	 */
	public handleCreatePictureWidget( data: {
		id: [number],
		original: string,
		url: string
	} ): void {
		if( data ) {
			// 创建图片类
			const _picture = new ImageModel(<ImageModel>{
				id: get(data, 'id[0]'),
				name: get(data, 'original'),
				url: get(data, 'url')
			});
			// 找出图片的原始itemwidget类
			const _item_widget = this.panelSoulService.fixedWidget$.value.find(_e => _e.type =='picture');
			if (_item_widget ) {
				// 创建图片widget组件
				const _widget = new PanelWidgetModel(cloneDeep(_item_widget))
				_widget.profileModel.setData({
					left: 30,
					top: 30,
				});
				_widget.autoWidget.content = _picture.url;
				// 添加到主视图中
				this.panelExtendService.addPanelWidget([_widget]);
				// 选中
				this.panelScopeEnchantmentService.onlyOuterSphereInsetWidget(_widget)
			}
		}
	}


}

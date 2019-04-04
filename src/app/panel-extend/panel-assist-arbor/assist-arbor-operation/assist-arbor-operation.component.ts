import { Component, OnInit } from '@angular/core';
import { PanelScopeEnchantmentService } from '../../panel-scope-enchantment/panel-scope-enchantment.service';
import { PanelExtendService } from '../../panel-extend.service';
import { cloneDeep } from 'lodash'
import { PanelInfoModel } from '../../Model';
import { PanelExtendQuickShortcutsService } from 'app/panel-extend/panel-extend-quick-shortcuts.service';

@Component({
	selector: 'app-assist-arbor-operation',
	templateUrl: './assist-arbor-operation.component.html',
	styleUrls: ['./assist-arbor-operation.component.scss', '../dropdown.scss']
})
export class AssistArborOperationComponent implements OnInit {

	// 是否有选中至少一个组件
	public get isCheckProfile() : boolean {
		return this.panelScopeEnchantmentService.scopeEnchantmentModel.valueProfileOuterSphere ? true : false
	}
	// 是否允许粘贴
	public get isPaste() : boolean {
		return this.panelScopeEnchantmentService.clipboardList$.value.length > 0
	}
	public get panelInfo(): PanelInfoModel {
		return this.panelExtendService.panelInfoModel
	}
	constructor(
		private panelScopeEnchantmentService: PanelScopeEnchantmentService,
		private panelExtendQuickShortcutsService: PanelExtendQuickShortcutsService,
		private panelExtendService: PanelExtendService
	) {}

	ngOnInit() {}

	/**
	 * 剪贴操作
	 */
	public acceptCut(): void {
		if (this.isCheckProfile ) {
			this.panelExtendQuickShortcutsService.performCutWidget();
		}
	}

	/**
	 * 复制操作
	 */
	public acceptCopy(): void {
		if (this.isCheckProfile ) {
			this.panelExtendQuickShortcutsService.performCopy();
		}
	}

	/**
	 * 粘贴操作
	 */
	public acceptPaste(): void {
		if( this.isPaste ) {
			this.panelExtendQuickShortcutsService.performPaste()
		}
	}

	/**
	 * 删除操作
	 */
	public acceptDel(): void {
		if( this.isCheckProfile ) {
			this.panelExtendQuickShortcutsService.performDelWidget()
		}
	}
}

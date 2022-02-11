const GetModelModal = {

	layout () {
		if (El.is_empty(code_view_modal)) {
			El.append(code_view_modal, `
				<div class='title' id='${ Find.replace(header_code, code_view_modal + ' > #', '') }'>
					<div class='label'></div>
					<div class='fas fa-times' onclick='Modals.close_all()'></div>

					<div class='fas fa-trash-alt' onclick="Confirm.run('delete_model')" title='Delete model'></div>
					<div class='far fa-heart' onclick='FavModels.execute()'></div>
				</div>

				<div class='bar' id='${ Find.replace(toolbar_code, code_view_modal + ' > #', '') }'>
					<div class='item icon'>
						<div class='fas fa-folder'></div>
					</div>

					<div class='item bdr-rig' id='share-model' onclick='ShareModel.toggle(this)'>Share</div>
					<div class='item bdr-rig' id='send-model' onclick='SendToModel.toggle(this)'>Send to</div>
					<div class='item bdr-rig' id='linked-model' onclick='ModelsLinked.toggle(this)'>Linked</div>

					<div class='right'>
						<div class='item icon' id='sql-minidoc' onclick='SDMList.toggle()' title='${ SDM.name }'>
							<div class='fas fa-book-open'></div>
						</div>

						<div class='item icon' id='download-model' onclick='GetModel.download()' title='Download'>
							<div class='fas fa-download'></div>
						</div>

						<div class='item icon no-bdr-rig' id='get-options-model' onclick='OptionsModel.toggle()' title="Option's">
							<div class='fas fa-cog'></div>
						</div>
					</div>

					<div class='message' id='${ Find.replace(code_view_message, toolbar_code + ' > #', '') }'></div>
				</div>

				<div class='menu-box'></div>

				<div class='link-scraper'>
					<div class='lk-header'>
						<img class='lk-preview' src=''>

						<div class='lk-title'>
							<img class='lk-favicon' src=''>
							<div class='lk-site'></div>
						</div>
					</div>
				</div>

				<div class='sdm-get' id='${ Find.replace_all(sdm_get, code_view_modal + ' > #', '') }'></div>
				<div class='sdm-list' id='${ Find.replace_all(sdm_list, code_view_modal + ' > #', '') }'></div>
				<div class='send-to-box' id='${ Find.replace(send_to_box, code_view_modal + ' > #', '') }'></div>
				<div class='share-box' id='${ Find.replace(share_code_box, code_view_modal + ' > #', '') }'></div>
				<div class='code-diagram' id='${ Find.replace(code_diagram, code_view_modal + ' > #', '') }'></div>
				<div class='options-box' id='${ Find.replace(options_model, code_view_modal + ' > #', '') }'></div>
				<div class='properties-menu' id='${ Find.replace(properties, code_view_modal + ' > #', '') }'></div>
				<div class='models-linked-box' id='${ Find.replace(models_linked_box, code_view_modal + ' > #', '') }'></div>
				
				<div class='visual-mode' id='${ Find.replace(visual_mode, code_view_modal + ' > #', '') }'>
					<table id='${ Find.replace(table_render_visual, visual_mode + ' > #', '') }'>
						<thead></thead>
						<tbody></tbody>
					</table>
				</div>
				
				<textarea id='${ cm_editor }'></textarea>
				<div class='bar status' id='${ Find.replace(status_code, code_view_modal + ' > #', '') }'></div>
			`)
		}
	},

}
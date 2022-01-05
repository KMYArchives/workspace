const GetModel = {

	modal () {
		if (El.is_empty(code_view_modal)) {
			El.append(code_view_modal, `
				<div class='title' id='${ Find.replace(header_code, code_view_modal + ' > #', '') }'>
					<div class='label'></div>
					<div class='fas fa-times' onclick='Modals.close_all()'></div>

					<div class='fas fa-trash-alt' onclick="Confirm.run('delete_model')" title='Delete model'></div>
					<div class='far fa-heart' onclick='FavModels.execute()'></div>
				</div>

				<div class='bar' id='${ Find.replace(toolbar_code, code_view_modal + ' > #', '') }'>
					<div class='item bdr-rig' id='share-model' onclick='ShareModel.toggle(this)'>Share</div>
					<div class='item bdr-rig' id='send-model' onclick='SendToModel.toggle(this)'>Send to</div>
					<div class='item bdr-rig' id='linked-model' onclick='ModelsLinked.toggle(this)'>Linked</div>

					<div class='right'>
						<div class='item icon' id='code-notes-model' onclick='CodeNotes.toggle()' title='Code Notes'>
							<div class='fas fa-sticky-note'></div>
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

				<div class='send-to-box' id='${ Find.replace(send_to_box, code_view_modal + ' > #', '') }'></div>
				<div class='share-box' id='${ Find.replace(share_code_box, code_view_modal + ' > #', '') }'></div>
				<div class='code-diagram' id='${ Find.replace(code_diagram, code_view_modal + ' > #', '') }'></div>
				<div class='options-box' id='${ Find.replace(options_model, code_view_modal + ' > #', '') }'></div>
				<div class='properties-menu' id='${ Find.replace(properties, code_view_modal + ' > #', '') }'></div>
				<div class='intellisense' id='${ Find.replace_all(intellisense, code_view_modal + ' > #', '') }'></div>
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

	delete () {
		var delete_data = new FormData()
		delete_data.append('slug', Queries.get('i'))

		fetch(`${ Apis.core() }cloud/models/delete`, {
			method: 'POST', 
			body: delete_data
		}).then(
			json => json.json()
		).then( callback => {
			if (callback.return == 'success') {
				Models.list()
				Modals.close_all()
			} else {
				GUI.message(code_view_message, callback.return)
			}
		}).catch( callback => {
			GUI.message(code_view_message, callback.return)
		})
	},

	effects () {
		Classes.add([
			properties,
			send_to_box,
			visual_mode,
			intellisense,
			code_diagram,
			options_model,
			share_code_box,
			models_linked_box,
			code_view_message,
		], 'animate__animated animate__zoomIn animate__faster')
	},

	download () {
		if (Classes.is_visible(visual_mode)) {
			html2canvas(
				document.querySelector(table_render_visual)
			).then( canvas => {
				Misc.download(
					canvas.toDataURL(), El.text(header_code + ' > .label') + '.png'
				)
			})
		} else {
			Misc.download(`${ 
				Apis.core() 
			}cloud/models/meta/download?slug=${ 
				Queries.get('i')
			}`)
		}
	},

	get (model = null) {
		El.hide(code_diagram)
		if (model != null) {
			Queries.add({
				i: model.id
			}, true)
		}

		fetch(`${ Apis.core() }cloud/models/get?slug=${ Queries.get('i') }`).then( 
			json => json.json() 
		).then( callback => {
			this.effects()

			OptionsModel.get()
			ShareModel.layout()
			StatusModel.layout()
			CodeDiagram.layout()
			SendToModel.layout()
			ModelsLinked.layout()

			CodeDiagramRun.get(callback)
			Editor.content(callback.content)
			PropsTable.get(callback.metadata)
			VisualMode.fields(callback.colunms)
			El.text(header_code + ' > .label', callback.name)

			FavModels.check(callback)
			Modals.show(code_view_modal)
		})
	},

}
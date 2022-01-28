const GetModel = {

	_effects () {
		Classes.add([
			sdm_get,
			sdm_list,
			properties,
			send_to_box,
			visual_mode,
			code_diagram,
			options_model,
			share_code_box,
			models_linked_box,
			code_view_message,
		], 'animate__animated animate__zoomIn animate__faster')
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
			this._effects()

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
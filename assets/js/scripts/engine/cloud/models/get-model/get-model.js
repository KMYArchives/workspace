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
		axios.post(`${ Apis.core() }cloud/models/delete`, {
			slug: Queries.get('i'),
		}).then( callback => {
			if (callback.data.return == 'success') {
				Models.list()
				Modals.close_all()
			} else {
				GUI.message(code_view_message, callback.data.return)
			}
		}).catch( callback => {
			GUI.message(code_view_message, callback.data.return)
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

		axios.get(`${ Apis.core() }cloud/models/get?slug=${ Queries.get('i') }`).then( callback => {
			this._effects()

			OptionsModel.get()
			ShareModel.layout()
			StatusModel.layout()
			CodeDiagram.layout()
			SendToModel.layout()
			ModelsLinked.layout()

			CodeDiagramRun.get(callback.data)
			Editor.content(callback.data.content)
			PropsTable.get(callback.data.metadata)
			VisualMode.fields(callback.data.colunms)
			El.text(header_code + ' > .label', callback.data.name)

			Modals.show(code_view_modal)
			FavModels.check(callback.data)
		})
	},

}
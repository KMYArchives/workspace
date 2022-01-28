const GetDiagram = {

	delete () {
		var delete_data = new FormData()
		delete_data.append('slug', Queries.get('i'))

		fetch(`${ Apis.core() }cloud/diagrams/delete`, {
			method: 'POST', 
			body: delete_data
		}).then(
			json => json.json()
		).then( callback => {
			if (callback.return == 'success') {
				ListDiagrams.list()
				Modals.close_all()
			} else {
				GUI.message(message_dgr, callback.return)
			}
		}).catch( callback => {
			GUI.message(message_dgr, callback.return)
		})
	},

	download () {
		Encoder.toDataURL(Attr.get(diagram_modal + ' > .viewer > img', 'src'), base64 => {
			Misc.download(
				base64, El.text(header_dgr + ' > .label') + '.png'
			)
		})
	},

	get (diagram = null) {
		if (diagram != null) {
			Queries.add({
				i: diagram.id
			}, true)
		}

		fetch(`${ Apis.core() }cloud/diagrams/get?slug=${ Queries.get('i') }`).then( 
			json => json.json() 
		).then( callback => {
			ShareDiagram.layout()
			OptionsDiagram.layout()
			
			OptionsDiagram.get()
			El.text(header_dgr + ' > .label', callback.name)
			Attr.set(diagram_modal + ' > .viewer > img', 'src', callback.image)

			Modals.show(diagram_modal)
		})
	},

}
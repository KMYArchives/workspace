const GetDiagram = {

	delete () {
		axios.post(`${ Apis.core() }cloud/diagrams/delete`, {
			slug: Queries.get('i'),
		}).then( callback => {
			if (callback.data.return == 'success') {
				ListDiagrams.list()
				Modals.close_all()
			} else {
				GUI.message(message_dgr, callback.data.return)
			}
		}).catch( callback => {
			GUI.message(message_dgr, callback.data.return)
		})
	},

	download () {
		Encoder.toDataURL(
			Attr.get(diagram_modal + ' > .viewer > img', 'src'), 
		base64 => {
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
	
		axios.get(`${ Apis.core() }cloud/diagrams/get?slug=${ Queries.get('i') }`).then( callback => {
			ShareDiagram.layout()
			OptionsDiagram.layout()
			
			OptionsDiagram.get()
			El.text(header_dgr + ' > .label', callback.data.name)
			Attr.set(diagram_modal + ' > .viewer > img', 'src', callback.data.image)

			Modals.show(diagram_modal)
		})
	},

}
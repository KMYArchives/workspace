const CodeDiagramIO = {

	save () {
		if (!Attr.has(code_diagram + ' > .viewer > img', 'src')) {
			html2canvas(
				this.element()
			).then( canvas => {
				var diagram_data = new FormData(),
					base64_img = Str.slice(
						canvas.toDataURL(), ',', 1
					)

				diagram_data.append('image', base64_img)
				diagram_data.append('model', Queries.get('i'))
				diagram_data.append('name', El.text(code_view_modal + ' > .title > .label'))

				fetch(`${ Apis.core() }cloud/diagrams/create`, {
					method: 'POST', 
					body: diagram_data
				}).then(
					json => json.json()
				).then( callback => {
					if (callback.return == 'success') {
						GUI.message('msg-dgr-model', 'Diagram saved with successfully.')
					}
				})
			})
		}
	},

	element () {
		if (Attr.get(code_diagram + ' > .viewer > img', 'src')) {
			return El.get(code_diagram + ' > .viewer > img')
		} else {
			return El.get(code_diagram + ' > .viewer > .model-diagram')
		}
	},

	download () {
		if (Attr.get(code_diagram + ' > .viewer > img', 'src')) {
			Encoder.toDataURL(
				Attr.get(code_diagram + ' > .viewer > img', 'src'),
			base64 => {
				Misc.download(
					base64, El.text(header_code + ' > .label') + '.png'
				)
			})
		} else {
			html2canvas(
				El.get(code_diagram + ' > .viewer > .model-diagram')
			).then( canvas => {
				Misc.download(
					canvas.toDataURL(), El.text(header_code + ' > .label') + '.png'
				)
			})
		}
	},

}
const CodeDiagramIO = {

	save () {
		if (!$(code_diagram + ' > .viewer > img').attr('src')) {
			html2canvas(
				this.element()
			).then( canvas => {
				var diagram_data = new FormData(),
					base64_img = Str.slice(
						canvas.toDataURL(), ',', 1
					)

				diagram_data.append('image', base64_img)
				diagram_data.append('model', URL.get_query('i'))
				diagram_data.append('name', $(code_view_modal + ' > .title > .label').text())

				fetch(`${ Apis.core() }cloud/diagrams/create`, {
					method: 'POST', 
					body: diagram_data
				}).then(
					json => json.json()
				)

				GUI.message('msg-dgr-model', 'Diagram saved with successfully.')
			})
		}
	},

	element () {
		if ($(code_diagram + ' > .viewer > img').attr('src')) {
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
					base64, El.getText(header_code + ' > .label') + '.png'
				)
			})
		} else {
			html2canvas(
				El.get(code_diagram + ' > .viewer > .model-diagram')
			).then( canvas => {
				Misc.download(
					canvas.toDataURL(), El.getText(header_code + ' > .label') + '.png'
				)
			})
		}
	},

}
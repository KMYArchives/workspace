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
			return document.querySelector(code_diagram + ' > .viewer > img')
		} else {
			return document.querySelector(code_diagram + ' > .viewer > .model-diagram')
		}
	},

	download () {
		if ($(code_diagram + ' > .viewer > img').attr('src')) {
			Encoder.toDataURL(
				$(code_diagram + ' > .viewer > img').attr('src'),
			base64 => {
				Misc.download(
					base64, $(header_code + ' > .label').text() + '.png'
				)
			})
		} else {
			html2canvas(
				document.querySelector(code_diagram + ' > .viewer > .model-diagram')
			).then( canvas => {
				Misc.download(
					canvas.toDataURL(), $(header_code + ' > .label').text() + '.png'
				)
			})
		}
	},

}
const CodeDiagramRun = {

	icon (key) {
		switch (key) {
			case 'pri':
			case 'PRI':
				return 'fas fa-key PRI'

			case 'uni': 
			case 'UNI':
				return 'fas fa-key UNI'

			default:
				return 'fas fa-caret-right'
		}
	},

	get (callback) {
		$(code_diagram + ' > .viewer > .model-diagram').hide()
		$(code_diagram + ' > .viewer > .model-diagram').empty()

		if (callback.diagram.link) {
			$(code_diagram + ' > .viewer > img').attr('src', callback.diagram.link)
		} else {
			$(code_diagram + ' > .viewer > .model-diagram').append(`
				<div class='name'>
					${ Str.cut(callback.name, 50) }
				</div>
			`)
			
			callback.colunms.forEach( field => { this.item_layout(field) })
			$(code_diagram + ' > .viewer > .model-diagram').show()
		}
		
		CodeDiagram.toggle_option(callback.diagram.slug)
	},

	item_layout (field) {
		$(code_diagram + ' > .viewer > .model-diagram').append(`
			<li>
				<div class='${ this.icon(field.Key) }'></div>
				${ Str.cut(field.Field, 32) } ${ Str.slice(field.Type, '(', 0).toUpperCase() }
			</li>
		`)
	}

}
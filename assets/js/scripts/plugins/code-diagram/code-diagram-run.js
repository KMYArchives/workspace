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
		El.hide(code_diagram + ' > .viewer > .model-diagram')
		El.empty(code_diagram + ' > .viewer > .model-diagram')

		if (callback.diagram.link) {
			Attr.set(code_diagram + ' > .viewer > img', 'src', callback.diagram.link)
		} else {
			El.append(code_diagram + ' > .viewer > .model-diagram', `
				<div class='name'>
					${ Str.cut(callback.name, 50) }
				</div>
			`)
			
			callback.colunms.forEach( field => { this.item_layout(field) })
			El.show(code_diagram + ' > .viewer > .model-diagram')
		}
		
		CodeDiagram.toggle_option(callback.diagram.slug)
	},

	item_layout (field) {
		El.append(code_diagram + ' > .viewer > .model-diagram', `
			<li>
				<div class='${ this.icon(field.Key) }'></div>
				${ Str.cut(field.Field, 32) } ${ Str.slice(field.Type, '(', 0).toUpperCase() }
			</li>
		`)
	}

}
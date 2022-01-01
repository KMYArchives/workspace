const CodeDiagram = {

	toggle () {
		$(code_diagram).fadeToggle(anim_time)
		Classes.toggle('#btn-code-diagram', act_class)
	},

	layout () {
		El.empty(code_diagram)
		El.append(code_diagram, `
			<div class='viewer'>
				<div class='message' id='msg-dgr-model'></div>
				<div class='model-diagram'></div>
				<img>
			</div>

			<div class='right-bar'>
				<div class='fas fa-save' id='option-1'></div>
				<div class='fas fa-download' id='option-2' onclick='CodeDiagramIO.download()' title='Download diagram'></div>
			</div>
		`)
	},

	toggle_option (slug = null) {
		var option = '#option-1'

		if (Attr.has(code_diagram + ' > .viewer > img', 'src')) {
			Classes.remove(option, 'fa-save')
			Classes.add(option, 'fa-external-link-alt')

			Attr.set(option, 'title', 'View diagram page')
			Attr.set(option, 'onclick', `Diagrams.go('${ slug }')`)
		} else {
			Classes.remove(option, 'fa-external-link-alt')
			Classes.add(option, 'fa-save')
			
			Attr.set(option, 'title', 'Save to my account')
			Attr.set(option, 'onclick', 'CodeDiagramIO.save()')
		}
	},

}
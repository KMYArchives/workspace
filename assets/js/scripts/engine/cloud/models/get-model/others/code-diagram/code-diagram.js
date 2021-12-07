const CodeDiagram = {

	toggle () {
		$(code_diagram).fadeToggle(anim_time)
		Classes.toggle('#btn-code-diagram')
	},

	layout () {
		$(code_diagram).empty()
		$(code_diagram).append(`
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

		if ($(code_diagram + ' > .viewer > img').attr('src')) {
			$(option).removeClass('fa-save')
			$(option).addClass('fa-external-link-alt')

			$(option).attr('title', 'View diagram page')
			$(option).attr('onclick', `Diagrams.go('${ slug }')`)
		} else {
			$(option).removeClass('fa-external-link-alt')
			$(option).addClass('fa-save')
			
			$(option).attr('title', 'Save to my account')
			$(option).attr('onclick', 'CodeDiagramIO.save()')

		}
	},

}
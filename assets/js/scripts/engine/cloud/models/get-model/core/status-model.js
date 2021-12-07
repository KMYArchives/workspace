const StatusModel = {

	layout () {
		$(status_code).empty()
		$(status_code).append(`
			<div class='option bdr-rig' id='${ Find.replace(props_btn, '#', '') }' onclick='PropsTable.toggle()'>
				Properties
				<div class='fas fa-info-circle'></div>
			</div>

			<div class='text' id='privacy-model'></div>
			<div class='text' id='collection-model'></div>

			<div class='right'>
				<div class='item icon' id='btn-code-diagram' onclick='CodeDiagram.toggle()' title='Diagram'>
					<div class='fas fa-project-diagram'></div>
				</div>

				<div class='item icon actived' id='code-mode' onclick='StatusModel.code_mode()' title='Code mode'>
					<div class='fas fa-code'></div>
				</div>

				<div class='item icon no-bdr-rig' id='visual-mode' onclick='StatusModel.visual_mode()' title='Visual mode'>
					<div class='fas fa-table'></div>
				</div>
			</div>
		`)
	},

	code_mode () {
		$(visual_mode).hide()
		$(code_diagram).hide()
		$('.CodeMirror').show()
		$(options_model).hide()

		$(status_code + ' > .right > .item').removeClass(act_class)
		$(status_code + ' > .right > #code-mode').addClass(act_class)
	},

	visual_mode () {
		$(visual_mode).show()
		$(code_diagram).hide()
		$('.CodeMirror').hide()
		$(options_model).hide()

		$(status_code + ' > .right > .item').removeClass(act_class)
		$(status_code + ' > .right > #visual-mode').addClass(act_class)
	},

	privacy (privacy) {
		$(status_code + ' > #privacy-model').empty()

		switch (privacy) {
			case 'public':
				$(status_code + ' > #privacy-model').append(`
					Public
					<div class='fas fa-globe'></div>
				`)
				break

			case 'private':
				$(status_code + ' > #privacy-model').append(`
					Private
					<div class='fas fa-lock'></div>
				`)
				break
		}
	},

	collection (collection) {
		$(status_code + ' > #collection-model').empty()

		if (collection.id != 0) {
			$(status_code + ' > #collection-model').append(`
				${ collection.name }
				<div class='fas fa-folder'></div>
			`)
		}
	},

}
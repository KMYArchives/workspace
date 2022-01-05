const StatusModel = {

	layout () {
		El.empty(status_code)
		El.append(status_code, `
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
		El.hide([
			visual_mode,
			code_diagram,
			options_model,
		])

		El.show('.CodeMirror')
		Classes.add(status_code + ' > .right > #code-mode', act_class)
		Classes.remove(status_code + ' > .right > #visual-mode', act_class)
	},

	visual_mode () {
		El.hide([
			code_diagram,
			options_model,
			'.CodeMirror',
		])

		El.show(visual_mode)
		Classes.add(status_code + ' > .right > #visual-mode', act_class)
		Classes.remove(status_code + ' > .right > #code-mode', act_class)
	},

	privacy (privacy) {
		El.empty(status_code + ' > #privacy-model')

		switch (privacy) {
			case 'public':
				El.append(status_code + ' > #privacy-model', `
					Public
					<div class='fas fa-globe'></div>
				`)
				break

			case 'private':
				El.append(status_code + ' > #privacy-model', `
					Private
					<div class='fas fa-lock'></div>
				`)
				break
		}
	},

	collection (collection) {
		El.empty(status_code + ' > #collection-model')

		if (collection.id != 0) {
			El.append(status_code + ' > #collection-model', `
				${ collection.name }
				<div class='fas fa-folder'></div>
			`)
		}
	},

}
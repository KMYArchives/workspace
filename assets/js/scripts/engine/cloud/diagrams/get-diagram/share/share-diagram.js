const ShareDiagram = {

	layout () {
		setTimeout( e => {
			El.empty(share_dgr_box)
			El.append(share_dgr_box, `
				<div class='social'></div>

				<div class='options' onclick="ShareDiagram.toggle_sub_options()">
					<div class='text'>Page</div>
					<div class='fas fa-chevron-down'></div>
				</div>

				<div class='sub-options'>
					<div class='option ${ Find.replace(act_class, '.', '') }' onclick="EmbedDiagram.options('page', this)">Page</div>
					<div class='option' onclick="EmbedDiagram.options('direct', this)">Direct</div>
					<div class='option' onclick="EmbedDiagram.options('html', this)">HTML</div>
					<div class='option' onclick="EmbedDiagram.options('bbcode', this)">BBCode</div>
					<div class='option' onclick="EmbedDiagram.options('markdown', this)">Markdown</div>
				</div>

				<div class='links'>
					<input type='text' value='${ EmbedDiagram.page() }' onclick="Misc.copy_input(this)" readonly>
				</div>
			`)

			Share.loader(
				Attr.get(diagram_modal + ' > .viewer > img', 'src'), 'diagrams'
			)
		}, anim_time)
	},

	toggle (el) {
		Classes.toggle(el, act_class)

		if (El.is_visible(share_dgr_box)) {
			El.hide(share_dgr_box)
		} else {
			El.show(share_dgr_box)
		}
	},

	toggle_sub_options () {
		El.remove('.options > .fas')

		if (Classes.is_visible('.sub-options')) {
			El.append('.options', `<div class='fas fa-chevron-down'></div>`)
		} else {
			El.append('.options', `<div class='fas fa-chevron-up'></div>`)
		}

		Classes.toggle('.options', act_class)
		if (El.is_visible('.sub-options')) {
			El.hide('.sub-options')
		} else {
			El.show('.sub-options')
		}
	}

}
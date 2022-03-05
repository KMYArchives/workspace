const ShareModel = {

	layout () {
		El.empty(share_code_box)
		El.append(share_code_box, `
			<div class='social'></div>

			<div class='options' onclick="ShareModel.toggle_sub_options()">
				<div class='text'>Direct</div>
				<div class='fas fa-chevron-down'></div>
			</div>

			<div class='sub-options'>
				<div class='option' id='share-direct-code' onclick="ShareMisc.links('direct', this)">Direct</div>
				<div class='option' id='share-cli-code' onclick="ShareMisc.links('cli', this)">CLI</div>
				<div class='option' id='share-raw-code' onclick="ShareMisc.links('raw', this)">Raw</div>
			</div>

			<div class='links'>
				<input type='text' value='${ ShareMisc.link_direct() }' id='share-model-input' onclick="Copy.input(this)" readonly>
			</div>
		`)

		Share.loader(URL.get_url_base() + Queries.get('i'), 'models')
	},

	toggle () {
		El.hide([ send_to_box, models_linked_box ])
		
		Classes.remove([
			toolbar_code + ' > #send-model',
			toolbar_code + ' > #linked-model'
		], act_class)

		Classes.toggle('#share-model', act_class)
		if (El.is_visible(share_code_box)) {
			El.hide(share_code_box)
		} else {
			El.show(share_code_box)
		}
	},

	toggle_sub_options () {
		El.remove('.options > .fas')

		if (Classes.is_visible('.sub-options')) {
			El.append('.options', `
				<div class='fas fa-chevron-down'></div>
			`)
		} else {
			El.append('.options', `
				<div class='fas fa-chevron-up'></div>
			`)
		}

		Classes.add([
			'.sub-options'
		], 'animate__animated animate__zoomIn animate__faster')

		Classes.toggle('.options', act_class)
		if (El.is_visible('.sub-options')) {
			El.hide('.sub-options')
		} else {
			El.show('.sub-options')
		}
	}

}
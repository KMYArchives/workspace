const SendToModel = {

	layout () {
		El.empty(send_to_box)
		El.append(send_to_box, `
			<div class='header'>
				<div class='tab actived'>All</div>
				<div class='tab'>Favorites</div>
			</div>

			<div class='list'></div>
		`)
	},

	toggle () {
		El.hide([ share_code_box, models_linked_box ])
		
		Classes.remove([
			toolbar_code + ' > #share-model',
			toolbar_code + ' > #linked-model'
		], act_class)

		Classes.toggle('#send-model', act_class)
		if (Classes.has('#send-model', act_class)) {
			El.show(send_to_box)
			ListContactsModel.list()
		} else {
			El.hide(send_to_box)
		}
	},

}
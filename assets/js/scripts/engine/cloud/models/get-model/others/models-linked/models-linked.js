const ModelsLinked = {

	layout () {
		El.empty(models_linked_box)
		El.append(models_linked_box, `
			<div class='header'>
				<div class='label'>Linked</div>
				<div class='total'>0 item's</div>
			</div>

			<div class='list'></div>
		`)
	},

	toggle () {
		El.hide([ send_to_box, share_code_box ])
		
		Classes.remove([
			toolbar_code + ' > #send-model',
			toolbar_code + ' > #share-model',
		], act_class)

		Classes.toggle('#linked-model', act_class)
		if (Classes.has('#linked-model', act_class)) {
			El.show(models_linked_box)
			ListModelsLinked.list()
		} else {
			El.hide(models_linked_box)
		}
	},

}
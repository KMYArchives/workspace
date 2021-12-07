const ModelsLinked = {

	layout () {
		$(models_linked_box).empty()
		$(models_linked_box).append(`
			<div class='header'>
				<div class='label'>Linked</div>
				<div class='total'>0 item's</div>
			</div>

			<div class='list'></div>
		`)
	},

	toggle (el) {
		$(send_to_box).hide()
		$(share_code_box).hide()
		$(toolbar_code + ' > #send-model').removeClass(act_class)
		$(toolbar_code + ' > #share-model').removeClass(act_class)

		Classes.toggle(el)
		$(models_linked_box).fadeToggle(anim_time)
		if (Classes.is_visible(models_linked_box)) { ListModelsLinked.list() }
	},

}
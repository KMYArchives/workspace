const SendToModel = {

	layout () {
		$(send_to_box).empty()
		$(send_to_box).append(`
			<div class='header'>
				<div class='tab actived'>All</div>
				<div class='tab'>Favorites</div>
			</div>

			<div class='list'></div>
		`)
	},

	toggle (el) {
		$(share_code_box).hide()
		$(models_linked_box).hide()
		$(toolbar_code + ' > #share-model').removeClass(act_class)
		$(toolbar_code + ' > #linked-model').removeClass(act_class)

		Classes.toggle(el)
		$(send_to_box).fadeToggle(anim_time)
		if (Classes.is_visible(send_to_box)) { ListContactsModel.list() }
	},

}
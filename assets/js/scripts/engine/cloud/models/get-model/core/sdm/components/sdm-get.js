const SDMGet = {

	_watch () {
		if (Editor.select().length > 0) {
			SDMAjax.get(
				Editor.select().toLowerCase()
			)
		} else {
			SDM.hide_all()
		}
	},

	show () { El.show(sdm_get) },

	hide () { El.hide(sdm_get) },

	clear () { El.empty(sdm_get + ' > .get-def') },

}
const SDM = {

	name: 'SQL miniDoc (BETA)',
	
	toggle () {
		El.hide(sdm_get)
		Classes.toggle('#sql-minidoc', act_class)

		if (Classes.is_visible(sdm_list)) {
			El.hide(sdm_list)
		} else {
			El.show(sdm_list)
		}
	},

	loader () {
		SDMLayout.get()
		SDMLayout.list()

		SDMAjax.list()
		editor.addKeyMap({
			"F1": e => { SDMList.toggle() },
			"Esc": e => { this.hide_all() },
		})

		editor.on('cursorActivity', event => {
			if (event.doc.sel != undefined) {
				SDMGet._watch()
			} else {
				SDMGet.hide()
				SDMList.hide()
			}
		})
	},

	hide_all () {
		SDMGet.hide()
		SDMList.hide()
	},

}
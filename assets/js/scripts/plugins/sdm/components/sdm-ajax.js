const SDMAjax = {

	get (text) {
		if (text && !Validation.url(text)) {
			SDMGet.clear()
			
			axios.get(`${ Apis.core() }cloud/plugins/sql-minidoc/get?slug=${ text }`).then( callback => {
				if (callback.data != null) {
					El.text(
						sdm_get + ' > .header', Str.cut(
							callback.data.name, 36
						)
					)
					
					El.text(sdm_get + ' > .get-def', callback.data.content)
					
					SDMGet.show()
					SDMList.hide()
				}
			})
		}
	},

	list (offset = 0, term = null) {
		if (offset == 0) { SDMList.clear() }

		axios.get(`${ Apis.core() }cloud/plugins/sql-minidoc/list?offset=${ offset + SDMMisc._search_param(term) }`).then( callback => {
			Storage.save('sdm-total-items', callback.data.total)

			_.forEach(callback.data.list, doc => {
				SDMLayout._item(doc)
			})
		})
	},

}
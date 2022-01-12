const SDMAjax = {

	get (text) {
		if (text) {
			SDMGet.clear()

			fetch(`${
				Apis.core()
			}cloud/plugins/sql-minidoc/get?slug=${
				text
			}`).then( 
				json => json.json() 
			).then( callback => {
				if (callback != null) {
					El.text(
						sdm_get + ' > .header', Str.cut(
							callback.name, 36
						)
					)
					
					El.append(sdm_get + ' > .get-def', callback.content)
					
					SDMGet.show()
					SDMList.hide()
				}
			})
		}
	},

	list (offset = 0, term = null) {
		if (offset == 0) { SDMList.clear() }

		fetch(`${
			Apis.core()
		}cloud/plugins/sql-minidoc/list?offset=${
			offset + SDMMisc._search_param(term)
		}`).then( 
			json => json.json() 
		).then( callback => {
			Storage.save('sdm-total-items', callback.total)

			_.forEach(callback.list, doc => {
				SDMLayout._item(doc)
			})
		})
	},

}
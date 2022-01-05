const EditModel = {

	privacy () {
		var privacy_data = new FormData()
		privacy_data.append('slug', Queries.get_query('i'))

		fetch(`${ Apis.core() }cloud/models/meta/change-privacy`, {
			method: 'POST', 
			body: privacy_data
		}).then(
			json => json.json()
		).then( callback => {
			if (callback.return == 'success') {
				OptionsModel.get()
				ListModels.list_table()
			} else {
				console.log(callback)
			}
		}).catch( callback => {
			console.log(callback)
		})
	},

	collection (el) {
		var col_data = new FormData()
		col_data.append('col', el.id)
		col_data.append('slug', Queries.get('i'))

		fetch(`${ Apis.core() }cloud/models/meta/change-collection`, {
			method: 'POST', 
			body: col_data
		}).then(
			json => json.json()
		).then( callback => {
			if (callback.return == 'success') {
				StatusModel.collection(callback.collection)

				if (callback.collection != 0) {
					ListCollectionsModel.list(callback.collection.id)
				} else {
					El.remove(options_model + ' > .collection > .list > .item > .fas')
				}
			} else {
				console.log(callback)
			}
		}).catch( callback => {
			console.log(callback)
		})
	},
	
}
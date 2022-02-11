const EditModel = {

	privacy () {
		axios.post(`${ Apis.core() }cloud/models/meta/change-privacy`, {
			slug: Queries.get('i'),
		}).then( callback => {
			if (callback.data.return == 'success') {
				OptionsModel.get()
				ListModels.list_table()
			} else {
				console.log(callback.data.return)
			}
		}).catch( callback => {
			console.log(callback)
		})
	},

	collection (el) {
		axios.post(`${ Apis.core() }cloud/models/meta/change-collection`, {
			col: el.id,
			slug: Queries.get('i'),
		}).then( callback => {
			if (callback.data.return == 'success') {
				StatusModel.collection(callback.data.collection)

				if (callback.data.collection != 0) {
					ListCollectionsModel.list(callback.data.collection.id)
				} else {
					El.remove(options_model + ' > .collection > .list > .item > .fas')
				}
			} else {
				console.log(callback.data)
			}
		}).catch( callback => {
			console.log(callback.data)
		})
	},
	
}
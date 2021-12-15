const EditDiagram = {

	privacy () {
		var privacy_data = new FormData()
		privacy_data.append('slug', URL.get_query('i'))

		fetch(`${ Apis.core() }cloud/diagrams/meta/change-privacy`, {
			method: 'POST', 
			body: privacy_data
		}).then(
			json => json.json()
		).then( callback => {
			if (callback.return == 'success') {
				OptionsDiagram.get()
			} else {
				console.log(callback)
			}
		}).catch( callback => {
			console.log(callback)
		})
	},

	collection (el) {
		var col_data = new FormData()
		col_data.append('col', $(el).attr('id'))
		col_data.append('slug', URL.get_query('i'))

		fetch(`${ Apis.core() }cloud/diagrams/meta/change-collection`, {
			method: 'POST', 
			body: col_data
		}).then(
			json => json.json()
		).then( callback => {
			if (callback.return == 'success') {
				if (callback.collection != 0) {
					ListCollectionsDiagram.list(callback.collection.id)
				} else {
					$(options_dgr + ' > .collection > .list > .item > .fas').remove()
				}
			} else {
				console.log(callback)
			}
		}).catch( callback => {
			console.log(callback)
		})
	},
	
}
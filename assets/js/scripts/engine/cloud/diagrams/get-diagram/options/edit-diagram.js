const EditDiagram = {

	privacy () {
		axios.post(`${ Apis.core() }cloud/diagrams/meta/change-privacy`, {
			slug: Queries.get('i'),
		}).then( callback => {
			if (callback.data.return == 'success') {
				OptionsDiagram.get()
			} else {
				console.log(callback.data)
			}
		}).catch( callback => {
			console.log(callback.data)
		})
	},

	collection (el) {
		axios.post(`${ Apis.core() }cloud/diagrams/meta/change-collection`, {
			col: el.id,
			slug: Queries.get('i'),
		}).then( callback => {
			if (callback.data.return == 'success') {
				if (callback.data.collection != 0) {
					ListCollectionsDiagram.list(callback.data.collection.id)
				} else {
					El.remove(options_dgr + ' > .collection > .list > .item > .fas')
				}
			} else {
				console.log(callback.data)
			}
		}).catch( callback => {
			console.log(callback.data)
		})
	},
	
}
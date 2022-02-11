const ManagerCollectionPost = {

	edit () {
		axios.post(`${ Apis.core() }cloud/collections/edit`, {
			name: El.value('#col-name'),
			slug: Storage.get('col-slug'),
			privacy: El.value('#col-privacy'),
			collation: El.value('#col-collation'),
		}).then( callback => {
			if (callback.data.return == 'success') {
				Modals.close_all()
				Storage.delete('col-slug')
				ListCollections.list(callback.data.privacy)
			} else {
				console.log(callback.data)
			}
		}).catch( callback => {
			console.log(callback.data)
		})
	},

	create () {
		axios.post(`${ Apis.core() }cloud/collections/create`, {
			name: El.value('#col-name'),
			privacy: El.value('#col-privacy'),
			collation: El.value('#col-collation'),
		}).then( callback => {
			if (callback.data.return == 'success') {
				ListCollections.list()
				Modals.close_all()
			} else {
				console.log(callback.data)
			}
		}).catch( callback => {
			console.log(callback.data)
		})
	},

	delete (slug) {
		axios.post(`${ Apis.core() }cloud/collections/delete`, {
			slug: slug,
		}).then( callback => {
			if (callback.data.return == 'success') {
				ListCollections.list()
			} else {
				console.log(callback.data)
			}
		}).catch( callback => {
			console.log(callback.data)
		})
	},

}
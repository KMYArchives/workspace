const ManagerCollectionPost = {

	edit () {
		var col_data = new FormData()
		col_data.append('name', El.value('#col-name'))
		col_data.append('slug', Storage.get('col-slug'))
		col_data.append('privacy', El.value('#col-privacy'))
		col_data.append('collation', El.value('#col-collation'))

		fetch(`${ Apis.core() }cloud/collections/edit`, {
			method: 'POST', 
			body: col_data
		}).then(
			json => json.json()
		).then( callback => {
			if (callback.return == 'success') {
				Modals.close_all()
				Storage.delete('col-slug')
				ListCollections.list(callback.privacy)
			} else {
				console.log(callback)
			}
		}).catch( callback => {
			console.log(callback)
		})
	},

	create () {
		var col_data = new FormData()
		col_data.append('name', El.value('#col-name'))
		col_data.append('privacy', El.value('#col-privacy'))
		col_data.append('collation', El.value('#col-collation'))

		fetch(`${ Apis.core() }cloud/collections/create`, {
			method: 'POST', 
			body: col_data
		}).then(
			json => json.json()
		).then( callback => {
			if (callback.return == 'success') {
				ListCollections.list()
				Modals.close_all()
			} else {
				console.log(callback)
			}
		}).catch( callback => {
			console.log(callback)
		})
	},

	delete (slug) {
		var col_data = new FormData()
		col_data.append('slug', slug)

		fetch(`${ Apis.core() }cloud/collections/delete`, {
			method: 'POST', 
			body: col_data
		}).then(
			json => json.json()
		).then( callback => {
			if (callback.return == 'success') {
				ListCollections.list()
			} else {
				console.log(callback)
			}
		}).catch( callback => {
			console.log(callback)
		})
	},

}
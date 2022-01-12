const FavModels = {

	execute () {
		var item = Queries.get('i')

		var fav_data = new FormData()
		fav_data.append('slug', item)

		Queries.add({
			filter: 'favorites',
			i: item,
		})

		fetch(`${ Apis.core() }cloud/models/meta/favorite`, {
			method: 'POST', 
			body: fav_data
		}).then(
			json => json.json()
		).then( callback => {
			if (callback.return == 'success') {
				this.list_table()
				this.check(callback)
			}
		})
	},
	
	list_table () {
		Classes.add('#list-favs', act_class)
		Classes.remove([ '#list-privated', '#list-public' ], act_class)

		if (Queries.get('filter') != 'favorites') {
			Queries.update(
				'filter', 'favorites'
			)
		}
	
		ListModels.table_layout()
		fetch(`${ Apis.core() }cloud/models/list?filter=favorites`).then( 
			json => json.json() 
		).then( callback => {
			El.text(total_items, `Total: ${ callback.total } item's`)
			
			_.forEach(_.orderBy(callback.list, 'product', 'asc'), model => {
				ListModels.row_layout(model)
			})
		})
		
	},

	check (callback) {
		if (callback.favorited == 'true') {
			Classes.change(header_code + ' > .fa-heart', 'far', 'fas')
		} else {
			Classes.change(header_code + ' > .fa-heart', 'fas', 'far')
		}
	},

}
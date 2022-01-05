const FavHashes = {

	execute () {
		var fav_data = new FormData()
		fav_data.append('slug', Queries.get('i'))

		fetch(`${ Apis.core() }cloud/hashes/favorite`, {
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
	
		ListHashes.table_layout()
		fetch(`${ Apis.core() }cloud/hashes/list?filter=favorites`).then( 
			json => json.json() 
		).then( callback => {
			El.text(total_items, `Total: ${ callback.total } item's`)

			_.forEach(_.orderBy(callback.list, 'product', 'asc'), hash => {
				Models.row_layout(hash)
			})
		})
		
	},

	check (callback) {
		if (callback.favorited == 'true') {
			Classes.change(header_hash + ' > .fa-heart', 'far', 'fas')
		} else {
			Classes.change(header_hash + ' > .fa-heart', 'fas', 'far')
		}
	},

}
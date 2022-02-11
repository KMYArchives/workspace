const FavHashes = {

	execute () {
		axios.post(`${ Apis.core() }cloud/hashes/favorite`, {
			slug: Queries.get('i'),
		}).then( callback => {
			if (callback.data.return == 'success') {
				this.list_table()
				this.check(callback.data)
			} else {
				console.log(callback.data)
			}
		}).catch( callback => {
			console.log(callback.data)
		})
	},
	
	list_table () {
		Classes.add('#list-favs', act_class)
		Classes.remove([ '#list-privated', '#list-public' ], act_class)
	
		ListHashes.table_layout()
		axios.get(`${ Apis.core() }cloud/hashes/list?filter=favorites`).then( callback => {
			El.text(total_items, `Total: ${ callback.data.total } item's`)

			_.forEach(
				_.orderBy(
					callback.data.list, 'product', 'asc'
				), hash => {
					Hashes.row_layout(hash)
				}
			)
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
const FavDiagrams = {

	execute () {
		axios.post(`${ Apis.core() }cloud/diagrams/meta/favorite`, {
			slug: Queries.get('i'),
		}).then( callback => {
			if (callback.data.return == 'success') {
				this.list_table()
				this.check(callback.data)
			}
		})
	},
	
	list_table () {
		ListDiagrams.table_layout()
		Classes.add('#list-favs', act_class)
		Classes.remove([ '#list-privated', '#list-public' ], act_class)
	
		axios.get(`${ Apis.core() }cloud/diagrams/list?filter=favorites`).then( callback => {
			El.text(total_items, `Total: ${ callback.data.total } item's`)

			_.forEach(
				_.orderBy(
					callback.data.list, 'product', 'asc'
				), diagram => {
					Diagrams.row_layout(diagram)
				}
			)
		})
		
	},

	check (callback) {
		if (callback.favorited == 'true') {
			Classes.change(header_dgr + ' > .fa-heart', 'far', 'fas')
		} else {
			Classes.change(header_dgr + ' > .fa-heart', 'fas', 'far')
		}
	},

}
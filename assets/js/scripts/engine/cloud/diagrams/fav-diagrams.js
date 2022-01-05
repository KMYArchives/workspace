const FavDiagrams = {

	execute () {
		var fav_data = new FormData()
		fav_data.append('slug', Queries.get('i'))

		fetch(`${ Apis.core() }cloud/diagrams/meta/favorite`, {
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
	
		ListDiagrams.table_layout()
		fetch(`${ Apis.core() }cloud/diagrams/list?filter=favorites`).then( 
			json => json.json() 
		).then( callback => {
			El.text(total_items, `Total: ${ callback.total } item's`)
			_.forEach(_.orderBy(callback.list, 'product', 'asc'), diagram => { Diagrams.row_layout(diagram) })
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
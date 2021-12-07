const FavDiagrams = {

	execute () {
		var fav_data = new FormData()
		fav_data.append('slug', URL.get_query('i'))

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
		Classes.replace([
			side_box + ' > .tab'
		], '#list-favs')
	
		ListDiagrams.table_layout()
		fetch(`${ Apis.core() }cloud/diagrams/list?filter=favorites`).then( 
			json => json.json() 
		).then( callback => {
			$(total_items).text(`Total: ${ callback.total } item's`)
			_.forEach(_.orderBy(callback.list, 'product', 'asc'), diagram => { Diagrams.row_layout(diagram) })
		})
		
	},

	check (callback) {
		if (callback.favorited == 'true') {
			$(header_dgr + ' > .fa-heart').addClass('fas')
			$(header_dgr + ' > .fa-heart').removeClass('far')
		} else {
			$(header_dgr + ' > .fa-heart').addClass('far')
			$(header_dgr + ' > .fa-heart').removeClass('fas')
		}
	},

}
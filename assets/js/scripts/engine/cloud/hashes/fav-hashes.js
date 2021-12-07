const FavHashes = {

	execute () {
		var fav_data = new FormData()
		fav_data.append('slug', URL.get_query('i'))

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
		Classes.replace([ 
			side_box + ' > .tab'
		], '#list-favs')
	
		ListHashes.table_layout()
		fetch(`${ Apis.core() }cloud/hashes/list?filter=favorites`).then( 
			json => json.json() 
		).then( callback => {
			$(total_items).text(`Total: ${ callback.total } item's`)
			_.forEach(_.orderBy(callback.list, 'product', 'asc'), hash => { Models.row_layout(hash) })
		})
		
	},

	check (callback) {
		if (callback.favorited == 'true') {
			$(header_code + ' > .fa-heart').addClass('fas')
			$(header_code + ' > .fa-heart').removeClass('far')
		} else {
			$(header_code + ' > .fa-heart').addClass('far')
			$(header_code + ' > .fa-heart').removeClass('fas')
		}
	},

}
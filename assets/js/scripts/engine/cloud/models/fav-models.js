const FavModels = {

	execute () {
		var item = Queries.get('i')

		Queries.add({
			filter: 'favorites',
			i: item,
		})

		axios.post(`${ Apis.core() }cloud/models/meta/favorite`, {
			slug: item,
		}).then( callback => {
			if (callback.data.return == 'success') {
				this.list_table()
				this.check(callback.data)
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
		
		setTimeout( e => {
			axios.get(`${ Apis.core() }cloud/models/list?filter=favorites`).then( callback => {
				El.text(total_items, `Total: ${ callback.data.total } item's`)
				
				_.forEach(
					_.orderBy(
						callback.data.list, 'product', 'asc'
					), model => {
						ListModels.row_layout(model)
					}
				)
			})
		}, anim_time * 2)
	},

	check (callback) {
		if (callback.favorited == 'true') {
			Classes.change(header_code + ' > .fa-heart', 'far', 'fas')
		} else {
			Classes.change(header_code + ' > .fa-heart', 'fas', 'far')
		}
	},

}
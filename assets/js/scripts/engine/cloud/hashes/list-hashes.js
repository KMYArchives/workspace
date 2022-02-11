const ListHashes = {

	list () {
		if (Find.in_array(Params.get_last(), [ 'hashes' ])) {
			//GetHash.modal()
			this.list_table()

			Navbar.actived('tab-hashes')
			if (Queries.has('i')) { GetHash.get() }
		}
	},

	table_layout () {
		Table.clean_table()
		Table.header([ 'Name', 'Size', 'Type', 'Added in' ])
	},

	row_layout (hash) {
		Table.add_rows([
			{
				slug: hash.slug,
				click: 'GetHash.get(this)',
				rows: [
					Str.cut(hash.name, 32),
					hash.engine,
					hash.collation,
					hash.added_in
				]
			}
		], true)
	},

	params (filter, col_id = null) {
		var params

		if (filter == 'private') {
			params = '?filter=private'

			Classes.add('#list-privated', act_class)
			Classes.remove([ '#list-favs', '#list-public' ], act_class)
		} else if (filter == 'public') {
			params = '?filter=public'
			
			Classes.add('#list-public', act_class)
			Classes.remove([ '#list-favs', '#list-privated' ], act_class)
		} else {
			params = `?filter=collections&col=${ col_id.id }`
			Collections.get(col_id)
		}

		return params
	},

	list_table (filter = 'public', col_id = null) {
		this.table_layout()
		El.hide(collections_box)
		Classes.remove('#list-cols', act_class)
		El.remove(user_container + ' > .filter-area > .filter')

		axios.get(`${ Apis.core() }cloud/hashes/list${ this.params(filter, col_id) }`).then( callback => {
			El.text(total_items, `Total: ${ callback.data.total } item's`)

			_.forEach(
				_.orderBy(
					callback.data.list, 'name', 'asc'
				), hash => {
					this.row_layout(hash)
				}
			)
		})
	},

}
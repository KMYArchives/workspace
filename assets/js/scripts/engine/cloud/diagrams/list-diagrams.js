const ListDiagrams = {

	list () {
		if (Find.in_array(Params.get_last(), [ 'diagrams' ])) {
			this.list_table()
			GetDiagramModal.layout()

			Navbar.actived('tab-diagrams')
			if (Queries.has('i')) {
				setTimeout( e => {
					GetDiagram.get()
				}, anim_time * 2)
			}
		}
	},

	table_layout () {
		Table.clean_table()
		Table.header([ 'Name', 'Size', 'Added in' ])
	},

	row_layout (diagram) {
		Table.add_rows([
			{
				slug: diagram.slug,
				click: 'GetDiagram.get(this)',
				rows: [
					Str.cut(diagram.name, 32),
					Numbers.bytes(diagram.size),
					diagram.added_in
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
		
		axios.get(`${ Apis.core() }cloud/diagrams/list${ this.params(filter, col_id) }`).then( callback => {
			El.text(total_items, `Total: ${ callback.data.total } item's`)

			_.forEach(
				_.orderBy(
					callback.data.list, 'name', 'asc'
				), diagram => {
					this.row_layout(diagram)
				}
			)
		})
	},

}
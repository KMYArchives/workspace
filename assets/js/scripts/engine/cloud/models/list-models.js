const ListModels = {

	_set_filter (filter, col_id = null, append = false) {
		if (!Queries.has('filter')) {
			if (col_id) {
				Queries.add({
					filter: filter,
					col_id: col_id,
				}, append)
			} else {
				Queries.add({
					filter: filter,
				}, append)
			}
		} else {
			if (col_id) {
				Queries.update('col', col_id, append)
				Queries.update('filter', filter, append)
			} else {
				Queries.update('filter', filter, append)
			}
		}
	},

	list () {
		if (Find.in_array(Params.get_last(), [ 'models' ])) {
			GetModel.modal()
			
			if (Queries.get('filter') != 'favorites') {
				this.list_table(
					Queries.get('filter')
				)
			} else {
				FavModels.list_table()
			}

			Editor.loader()
			Navbar.actived('tab-models')

			if (Queries.has('i')) { GetModel.get() }
		}
	},

	table_layout () {
		Table.clean_table()
		Table.header([ 'Name', 'Engine', 'Collation', 'Added in' ])
	},

	row_layout (model) {
		Table.add_rows([
			{
				slug: model.slug,
				click: 'GetModel.get(this)',
				rows: [
					Str.cut(model.name, 32),
					model.metadata.engine,
					model.metadata.collation,
					model.added_in
				]
			}
		], true)
	},

	params (filter, col_id = null) {
		var params, append = false
		if (Queries.has('i')) { append = true }

		if (filter == 'private') {
			params = '?filter=private'
			Classes.add('#list-privated', act_class)
			Classes.remove([ '#list-favs', '#list-public' ], act_class)
			
			Queries.remove([ 'col' ])
			this._set_filter(filter, col_id, append)
		} else if (filter == 'public') {
			params = '?filter=public'
			Classes.add('#list-public', act_class)
			Classes.remove([ '#list-favs', '#list-privated' ], act_class)
			
			Queries.remove([ 'col' ])
			this._set_filter(filter, col_id, append)
		} else {
			params = `?filter=collections&col=${ col_id.id }`

			Collections.get(col_id)
			this._set_filter(filter, col_id)
		}

		return params
	},

	list_table (filter = 'public', col_id = null) {
		this.table_layout()
		El.hide(collections_box)
		Classes.remove('#list-cols', act_class)
		El.remove(user_container + ' > .filter-area > .filter')

		var loaded = false
		var Interval = setInterval( e => {
			if (loaded != true) {
				fetch(`${ Apis.core() }cloud/models/list${ this.params(filter, col_id) }`).then( 
					json => json.json() 
				).then( callback => {
					El.text(total_items, `Total: ${ callback.total } item's`)
					_.forEach(_.orderBy(callback.list, 'name', 'asc'), model => { this.row_layout(model) })
				})

				loaded = true
			} else {
				clearInterval(Interval)
			}
		}, anim_time)
	},

}
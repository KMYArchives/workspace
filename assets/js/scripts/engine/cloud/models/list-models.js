const ListModels = {

	list () {
		if (Find.in_array(URL.get_last_param(), [ 'models' ])) {
			setTimeout( e => {
				GetModel.modal()
				this.list_table()
	
				Editor.loader()
				Classes.replace([
					'.sidebar > .item'
				], '#tab-models')

				setTimeout( e => {
					if (URL.get_query('i') != null) { GetModel.get() }
				}, anim_time * 2)
			}, anim_time * 2)
		}
	},

	params (filter) {
		var params

		if (filter == 'private') {
			params = '?filter=private'
			Classes.replace([ side_box + ' > .tab' ], '#list-privated')
		} else if (filter == 'public') {
			params = '?filter=public'
			Classes.replace([ side_box + ' > .tab' ], '#list-public')
		} else {
			params = `?filter=collections&col=${ $(col_id).attr('id') }`
			Collections.get(col_id)
		}

		return params
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

	list_table (filter = 'public', col_id = null) {
		this.table_layout()
		$(collections_box).hide()
		$('#list-cols').removeClass(act_class)
		$(user_container + ' > .filter-area > .filter').remove()

		var loaded = false
		var Interval = setInterval( e => {
			if (loaded != true) {
				fetch(`${ Apis.core() }cloud/models/list${ this.params(filter) }`).then( 
					json => json.json() 
				).then( callback => {
					$(total_items).text(`Total: ${ callback.total } item's`)
					_.forEach(_.orderBy(callback.list, 'name', 'asc'), model => { this.row_layout(model) })
				})

				loaded = true
			} else {
				clearInterval(Interval)
			}
		}, anim_time)
	},

}
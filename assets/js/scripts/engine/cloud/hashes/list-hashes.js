const ListHashes = {

	list () {
		if (Find.in_array(URL.get_last_param(), [ 'hashes' ])) {
			setTimeout( e => {
				//GetHash.modal()
				this.list_table()

				Classes.replace([
					'.sidebar > .item'
				], '#tab-hashes')
	
				setTimeout( e => {
					if (URL.get_query('i') != null) { GetHash.get() }
				}, anim_time * 3)
			}, anim_time * 2)
		}
	},

	table_layout () {
		Table.clean_table()
		Table.header([ 'Name', 'Size', 'Type', 'Added in' ])
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

	list_table (filter = 'public', col_id = null) {
		this.table_layout()
		$(collections_box).hide()
		$('#list-cols').removeClass(act_class)
		$(user_container + ' > .filter-area > .filter').remove()

		var loaded = false
		var Interval = setInterval( e => {
			if (loaded != true) {
				fetch(`${ Apis.core() }cloud/hashes/list${ params }`).then( 
					json => json.json() 
				).then( callback => {
					$(total_items).text(`Total: ${ callback.total } item's`)
					_.forEach(_.orderBy(callback.list, 'name', 'asc'), hash => { this.row_layout(hash) })
				})

				loaded = true
			} else {
				clearInterval(Interval)
			}
		}, anim_time)
	},

}
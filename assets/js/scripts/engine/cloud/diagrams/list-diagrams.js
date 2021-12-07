const ListDiagrams = {

	list () {
		if (Find.in_array(URL.get_last_param(), [ 'diagrams' ])) {
			setTimeout( e => {
				this.list_table()
				GetDiagram.modal()
	
				Classes.replace([
					'.sidebar > .item'
				], '#tab-diagrams')

				setTimeout( e => {
					if (URL.get_query('i') != null) { GetDiagram.get() }
				}, anim_time * 3)
			}, anim_time * 2)
		}
	},

	table_layout () {
		$(user_container + ' > table > thead').empty()
		$(user_container + ' > table > tbody').empty()
		
		$(user_container + ' > table > thead').append(`
			<tr>
				<th>Name</th>
				<th>Size</th>
				<th>Added in</th>
			</tr>
		`)
	},

	row_layout (diagram) {
		$(user_container + ' > table > tbody').append(`
			<tr id='${ diagram.slug }' onclick='GetDiagram.get(this)'>
				<td>${ Str.cut(diagram.name, 32) }</td>
				<td>${ Numbers.bytes(diagram.size) }</td>
				<td>${ diagram.added_in }</td>
			</tr>
		`)
	},

	list_table (filter = 'public', col_id = null) {
		this.table_layout()
		$(collections_box).hide()
		$('#list-cols').removeClass(act_class)
		$(user_container + ' > .filter-area > .filter').remove()

		var params = '', 
			loaded = false

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

		var Interval = setInterval( e => {
			if (loaded != true) {
				fetch(`${ Apis.core() }cloud/diagrams/list${ params }`).then( 
					json => json.json() 
				).then( callback => {
					$(total_items).text(`Total: ${ callback.total } item's`)
					_.forEach(_.orderBy(callback.list, 'name', 'asc'), diagram => { this.row_layout(diagram) })
				})

				loaded = true
			} else {
				clearInterval(Interval)
			}
		}, anim_time)
	},

}
const ListCollections = {

	privacy (filter) {
		$(collections_box + ' > .tabs > .tab').removeClass(act_class)

		if (filter != 'public') {
			$('#col-priv').addClass(act_class)
			return '?filter=private'
		} else {
			$('#col-pub').addClass(act_class)
			return '?filter=public'
		}
	},

	check_page (item) {
		switch (URL.get_last_param()) {
			case 'models':
				Models.list_table('collections', item)
				break

			case 'hashes':
				Hashes.list_table('collections', item)
				break
		}
	},

	item_layout (item) {
		$(collections_box + ' > .list').append(`
			<div class='item'>
				<div class='name' id='${ item.id }' slug='${ item.slug }' onclick="ListCollections.check_page(this)">
					${ item.name }
				</div>
				
				<div class='right'>
					<div class='fas fa-edit' onclick="ManagerCollection.edit_modal('${ item.slug }')"></div>
					<div class='fas fa-trash-alt' onclick="Confirm.run('delete_collection', '${ item.slug }')"></div>
				</div>
			</div>
		`)
	},

	list (privacy = 'public') {
		Collections.layout()
		ManagerCollection.modal()
		$(collections_box + ' > .list').empty()

		var loaded = false
		var Interval = setInterval( e => {
			if (loaded != true) {
				fetch(`${ Apis.core() }cloud/collections/list${ this.privacy(privacy) }`).then( 
					json => json.json() 
				).then( callback => {
					$(collections_box + ' > .list').empty()
					$(collections_box + ' > .header > .total').text(`Total: ${ callback.total } item's`)

					if (callback.total > 0) {
						_.forEach(_.orderBy(callback.list, 'name', 'asc'), item => { this.item_layout(item) })
					} else {
						$(collections_box + ' > .list').append(`
							<div class='none'>
								You no have collections
							</div>
						`)
					}
				})

				loaded = true
			} else {
				clearInterval(Interval)
			}
		}, anim_time * 2)
	},

}
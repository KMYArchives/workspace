const ListCollections = {

	privacy (filter) {
		Classes.remove([
			'#col-priv', '#col-pub'
		], act_class)

		if (filter != 'public') {
			Classes.add('#col-priv', act_class)
			return '?filter=private'
		} else {
			Classes.add('#col-pub', act_class)
			return '?filter=public'
		}
	},

	check_page (item) {
		switch (Params.get_last()) {
			case 'models':
				ListModels.list_table('collections', item)
				break

			case 'hashes':
				ListHashes.list_table('collections', item)
				break

			case 'diagrams':
				ListDiagrams.list_table('collections', item)
				break
		}
	},

	item_layout (item) {
		El.append(collections_box + ' > .list', `
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
		El.empty(collections_box + ' > .list')

		var loaded = false
		var Interval = setInterval( e => {
			if (loaded != true) {
				fetch(`${ Apis.core() }cloud/collections/list${ this.privacy(privacy) }`).then( 
					json => json.json() 
				).then( callback => {
					El.text(collections_box + ' > .header > .total', `Total: ${ callback.total } item's`)

					if (callback.total > 0) {
						_.forEach(_.orderBy(callback.list, 'name', 'asc'), item => { this.item_layout(item) })
					} else {
						El.append(collections_box + ' > .list', `
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
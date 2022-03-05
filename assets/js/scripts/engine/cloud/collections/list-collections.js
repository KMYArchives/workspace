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
					<div class='fa-solid fa-edit' onclick="ManagerCollection.edit_modal('${ item.slug }')"></div>
					<div class='fa-solid fa-trash-alt' onclick="Confirm.run('delete_collection', '${ item.slug }')"></div>
				</div>
			</div>
		`)
	},

	list (privacy = 'public') {
		Collections.layout()
		ManagerCollection.modal()
		El.empty(collections_box + ' > .list')
		
		axios.get(`${ Apis.core() }cloud/collections/list${ this.privacy(privacy) }`).then( callback => {
			El.text(collections_box + ' > .header > .total', `Total: ${ callback.data.total } item's`)

			if (callback.data.total > 0) {
				_.forEach(
					_.orderBy(
						callback.data.list, 'name', 'asc'
					), item => {
						this.item_layout(item)
					}
				)
			} else {
				El.append(collections_box + ' > .list', `
					<div class='none'>
						You no have collections
					</div>
				`)
			}
		})
	},

}
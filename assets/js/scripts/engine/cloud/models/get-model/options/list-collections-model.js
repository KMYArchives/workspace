const ListCollectionsModel = {

	toggle (el) {
		Classes.toggle('#list-cols-options-model', act_class)
		
		if (El.is_visible('.collection')) {
			El.hide('.collection')
		} else {
			El.show('.collection')
		}
	},

	list (col_id) {
		El.empty(options_model + ' > .collection > .list')

		axios.get(`${ Apis.core() }cloud/collections/list`).then( callback => {
			if (callback.data.total > 0) {
				El.show('#remove-col')

				_.forEach(
					_.orderBy(
						callback.data.list, 'name', 'asc'
					), item => {
						this.item_layout(item, col_id)
					}
				)
			} else {
				El.hide('#remove-col')

				El.append(options_model + ' > .collection > .list', `
					<div class='none'>
						You no have collections
					</div>
				`)
			}
		})
	},

	item_layout (item, col_id) {
		if (item.id == col_id) {
			El.append(options_model + ' > .collection > .list', `
				<div class='item' id='${ item.id }' onclick="EditModel.collection(this)">
					${ item.name }
					<div class='fas fa-check'></div>
				</div>
			`)
		} else {
			El.append(options_model + ' > .collection > .list', `
				<div class='item' id='${ item.id }' onclick="EditModel.collection(this)">
					${ item.name }
				</div>
			`)
		}
	},
	
}
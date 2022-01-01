const ListCollectionsModel = {

	toggle (el) {
		Classes.toggle('#list-cols-options-model', act_class)
		$('.collection').slideToggle(anim_time)
	},

	list (col_id) {
		$(options_model + ' > .collection > .list').empty()

		var loaded = false
		var Interval = setInterval( e => {
			if (loaded != true) {
				fetch(`${ Apis.core() }cloud/collections/list`).then( 
					json => json.json() 
				).then( callback => {
					if (callback.total > 0) {
						$('#remove-col').show()
						_.forEach(_.orderBy(callback.list, 'name', 'asc'), item => { this.item_layout(item, col_id) })
					} else {
						$('#remove-col').hide()
						$(options_model + ' > .collection > .list').append(`
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
		}, anim_time)
	},

	item_layout (item, col_id) {
		if (item.id == col_id) {
			$(options_model + ' > .collection > .list').append(`
				<div class='item' id='${ item.id }' onclick="EditModel.collection(this)">
					${ item.name }
					<div class='fas fa-check'></div>
				</div>
			`)
		} else {
			$(options_model + ' > .collection > .list').append(`
				<div class='item' id='${ item.id }' onclick="EditModel.collection(this)">
					${ item.name }
				</div>
			`)
		}
	},
	
}
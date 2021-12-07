const ListModelsLinked = {

	list () {
		fetch(`${ Apis.core() }cloud/models/list?filter=linked&slug=${ URL.get_query('i') }`).then( 
			json => json.json() 
		).then( callback => {
            $(models_linked_box + ' > .list').empty()
            $(models_linked_box + ' > .header > .total').text(`${ callback.total } item's`)
			
			if (callback.total > 0) {
				_.forEach(_.orderBy(callback.list, 'name', 'asc'), linked => {
					this.item_layout(linked)
				})
			} else {
				$(models_linked_box + ' > .list').append(`
                    <div class='none'>You not have models linked</div>
                `)
			}
		})
	},

	item_layout (linked) {
		$(models_linked_box + ' > .list').append(`
			<div class='item' slug='${ linked.slug }'>
                ${ linked.name }
            </div>
		`)
	},

}
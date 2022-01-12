const ListModelsLinked = {

	list () {
		fetch(`${ Apis.core() }cloud/models/list?filter=linked&slug=${ Queries.get('i') }`).then( 
			json => json.json() 
		).then( callback => {
            El.empty(models_linked_box + ' > .list')
            El.text(models_linked_box + ' > .header > .total', `${ callback.total } item's`)
			
			if (callback.total > 0) {
				_.forEach(_.orderBy(callback.list, 'name', 'asc'), linked => {
					this.item_layout(linked)
				})
			} else {
				El.append(models_linked_box + ' > .list', `
                    <div class='none'>You not have models linked</div>
                `)
			}
		})
	},

	item_layout (linked) {
		El.append(models_linked_box + ' > .list',`
			<div class='item' slug='${ linked.slug }'>
                ${ linked.name }
            </div>
		`)
	},

}
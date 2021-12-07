const OptionsDiagram = {

	get () {
		this.layout()
		$(options_dgr + ' > #diagram-privacy > .fas').remove()

		fetch(`${ Apis.core() }cloud/diagrams/meta/get-options?slug=${ URL.get_query('i') }`).then( 
			json => json.json() 
		).then( callback => {
			if (callback.privacy == 'public') {
				$(options_dgr + ' > #diagram-privacy').append(`<div class='fas fa-check'></div>`)
			}

			ListCollectionsDiagram.list(callback.collection.id)
		})
	},

	layout () {
		$(options_dgr).empty()
		$(options_dgr).append(`
			<div class='item' id='diagram-privacy' onclick='EditDiagram.privacy()'>Public</div>

			<div class='item' onclick="ListCollectionsDiagram.toggle(this)">
				Collection
				<div class='fas fa-folder icon-left'></div>
			</div>

			<div class='collection'>
				<div class='list'></div>

				<div class='item' id='remove-col' onclick="EditDiagram.collection('0')">Remove in this collection</div>
			</div>
		`)
	},

	toggle () {
		Classes.toggle('#get-options-diagram')
		$(options_dgr).fadeToggle(anim_time)
	},
	
}
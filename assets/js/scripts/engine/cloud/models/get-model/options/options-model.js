const OptionsModel = {

	get () {
		this.layout()
		$(options_model + ' > #model-privacy > .fas').remove()

		fetch(`${ Apis.core() }cloud/models/meta/get-options?slug=${ URL.get_query('i') }`).then( 
			json => json.json() 
		).then( callback => {
			StatusModel.privacy(callback.privacy)
			StatusModel.collection(callback.collection)

			if (callback.privacy == 'public') {
				$(options_model + ' > #model-privacy').append(`<div class='fas fa-check'></div>`)
			}

			ListCollectionsModel.list(callback.collection.id)
		})
	},

	layout () {
		$(options_model).empty()
		$(options_model).append(`
			<div class='item' id='model-privacy' onclick='EditModel.privacy()'>Public</div>

			<div class='item' id='list-cols-options-model' onclick="ListCollectionsModel.toggle(this)">
				Collection
				<div class='fas fa-folder icon-left'></div>
			</div>

			<div class='collection'>
				<div class='list'></div>
				<div class='item' id='remove-col' onclick="EditModel.collection('0')">Remove in this collection</div>
			</div>
		`)
	},

	toggle () {
		Classes.toggle('#get-options-model')
		$(options_model).fadeToggle(anim_time)
	},
	
}
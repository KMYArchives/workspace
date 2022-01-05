const OptionsModel = {

	get () {
		this.layout()
		El.remove(options_model + ' > #model-privacy > .fas')

		fetch(`${ Apis.core() }cloud/models/meta/get-options?slug=${ Queries.get('i') }`).then( 
			json => json.json() 
		).then( callback => {
			StatusModel.privacy(callback.privacy)
			StatusModel.collection(callback.collection)

			if (callback.privacy == 'public') {
				El.append(options_model + ' > #model-privacy', `
					<div class='fas fa-check'></div>
				`)
			}

			ListCollectionsModel.list(callback.collection.id)
		})
	},

	layout () {
		El.empty(options_model)
		El.append(options_model, `
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
		Classes.toggle('#get-options-model', act_class)

		if (El.is_visible(options_model)) {
			El.hide(options_model)
		} else [
			El.show(options_model)
		]
	},
	
}
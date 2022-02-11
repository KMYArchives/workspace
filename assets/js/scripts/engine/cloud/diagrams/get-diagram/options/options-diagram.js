const OptionsDiagram = {

	get () {
		this.layout()
		El.remove(options_dgr + ' > #diagram-privacy > .fas')

		axios({
			method: 'get',
			url: `${ Apis.core() }cloud/diagrams/meta/get-options?slug=${ Queries.get('i') }`,
		}).then( callback => {
			if (callback.data.privacy == 'public') {
				El.append(options_dgr + ' > #diagram-privacy', `
					<div class='fas fa-check'></div>
				`)
			}

			ListCollectionsDiagram.list(callback.data.collection.id)
		})
	},

	layout () {
		El.empty(options_dgr)
		El.append(options_dgr, `
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
		Classes.toggle('#get-options-diagram', act_class)

		if (El.is_visible(options_dgr)) {
			El.hide(options_dgr)
		} else {
			El.show(options_dgr)
		}
	},
	
}
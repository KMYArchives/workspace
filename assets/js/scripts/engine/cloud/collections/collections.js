const Collections = {

	toggle () {
		Classes.toggle('#list-cols', act_class)

		if (El.is_visible(collections_box)) {
			El.hide(collections_box)
		} else {
			El.show(collections_box)
		}
	},

	layout () {
		El.empty(collections_box)
		El.append(collections_box, `
			<div class='header'>
				<div class='button' onclick='ManagerCollection.create_modal()'>
					New
					<div class='fa-solid fa-plus'></div>
				</div>

				<div class='total'></div>
			</div>

			<div class='tabs'>
				<div class='tab actived' id='col-pub' onclick="ListCollections.list('public')">Public</div>
				<div class='tab' id='col-priv' onclick="ListCollections.list('private')">Private</div>
			</div>

			<div class='list'></div>
		`)
	},

	get (item) {
		axios.get(`${ Apis.core() }cloud/collections/get?slug=${ Attr.get(item, 'slug') }`).then( callback => {
			El.append(user_container + ' > .filter-area', `
				<div class='filter' title='Remove filter' onclick='Collections.check_page()'>
					${ callback.data.name }
					<div class='fa-solid fa-filter'></div>
				</div>
			`)
		})
	},

}
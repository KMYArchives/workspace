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
					<div class='fas fa-plus'></div>
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
		setTimeout( e => {
			fetch(`${ Apis.core() }cloud/collections/get?slug=${ Attr.get(item, 'slug') }`).then( 
				json => json.json() 
			).then( callback => {
				El.append(user_container + ' > .filter-area', `
					<div class='filter' title='Remove filter' onclick='Collections.check_page()'>
						${ callback.name }
						<div class='fas fa-filter'></div>
					</div>
				`)
			})
		}, anim_time)
	},

}
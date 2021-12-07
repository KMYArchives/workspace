const Collections = {

	layout () {
		$(collections_box).empty()
		$(collections_box).append(`
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

	toggle () {
		Classes.toggle('#list-cols')
		$(collections_box).fadeToggle(anim_time)
	},

	get (item) {
		setTimeout( e => {
			fetch(`${ Apis.core() }cloud/collections/get?slug=${ $(item).attr('slug') }`).then( 
				json => json.json() 
			).then( callback => {
				$(user_container + ' > .filter-area').append(`
					<div class='filter' title='Remove filter' onclick='Collections.check_page()'>
						${ callback.name }
						<div class='fas fa-filter'></div>
					</div>
				`)
			})
		}, anim_time)
	},

	check_page () {
		switch (URL.get_last_param()) {
			case 'models':
				Models.list_table()
				break

			case 'hashes':
				Hashes.list_table()
				break
		}
	},

}
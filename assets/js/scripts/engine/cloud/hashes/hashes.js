const Hashes = {

	side_box () {
		El.show(side_box)
		El.empty(side_box)
		El.append(side_box, `
			<div class='tab actived' id='list-public' onclick="ListHashes.list_table('public')">
				Public
				<div class='fas fa-globe'></div>
			</div>

			<div class='tab' id='list-privated' onclick="ListHashes.list_table('private')">
				Private
				<div class='fas fa-lock'></div>
			</div>

			<div class='tab' id='list-favs' onclick='FavHashes.list_table()'>
				Favorites
				<div class='fas fa-star'></div>
			</div>
			
			<hr>

			<div class='tab' id='list-cols' onclick='Collections.toggle()'>
				Collections
				<div class='fas fa-folder'></div>
			</div>

			<hr>
			<div class='label' id='${ Find.replace_all(total_items, '#', '') }'></div>
		`)

		ListCollections.list()
	},

	page_load () {
		if (Params.get_last() != 'hashes') {
			URL.change_url(`${ URL.get_url_base() }hashes`)
		}

		this.side_box()
		ListHashes.list()
	},

}
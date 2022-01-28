const Diagrams = {

	go (slug) {
		window.open(
			Find.replace(
				URL.get_url(), 'models/', `diagrams?i=${ slug }`
			)
		)
	},

	side_box () {
		El.show(side_box)
		El.empty(side_box)
		El.append(side_box, `
			<div class='tab actived' id='list-public' onclick="ListDiagrams.list_table('public')">
				Public
				<div class='fas fa-globe'></div>
			</div>

			<div class='tab' id='list-privated' onclick="ListDiagrams.list_table('private')">
				Private
				<div class='fas fa-lock'></div>
			</div>

			<div class='tab' id='list-favs' onclick='FavDiagrams.list_table()'>
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
		if (Params.get_last() != 'diagrams') { 
			URL.change_url(`${ URL.get_url_base() }diagrams`) 
		}

		this.side_box()
		setTimeout( e => ListDiagrams.list(), anim_time * 2)
	},

}
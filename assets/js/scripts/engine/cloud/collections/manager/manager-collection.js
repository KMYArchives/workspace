const ManagerCollection = {

	modal () {
		El.append(collection_modal)
		El.append(collection_modal, `
			<div class='title'>
				<div class='label'></div>
				<div class='fas fa-times' onclick='Modals.close_all()'></div>
			</div>

			<div class='body'>
				<div class='label'>Name</div>
				<input type='text' placeholder='Type the collection name' id='col-name'>

				<div class='label'>Privacy</div>
				<select id='col-privacy'>
					<option value='public'>Public</option>
					<option value='private'>Private</option>
				</select>

				<div class='label'>Collation</div>
				<select id='col-collation'></select>

				<div class='btn' id='col-submit'></div>
			</div>
		`)

		this.list_collations()
	},

	create_modal () {
		El.text('#col-submit', 'Create')
		El.text(collection_modal + ' > .title > .label', 'Create collection')
		Attr.set(collection_modal + ' > .body > .btn', 'onclick', 'ManagerCollectionPost.create()')

		El.value('#col-name','')
		El.value('#col-privacy', 'public')
		El.value('#col-collation', 'utf8_general_ci')

		Modals.show(collection_modal)
	},

	edit_modal (slug) {
		Storage.save('col-slug', slug)

		fetch(`${ Apis.core() }cloud/collections/get?slug=${ Storage.get('col-slug') }`).then( 
			json => json.json() 
		).then( callback => {
			El.text('#col-submit', 'Save')
			El.value('#col-name', callback.name)
			El.value('#col-privacy', callback.privacy)
			El.value('#col-collation', callback.collation)

			El.text(collection_modal + ' > .title > .label', 'Edit collection')
			Attr.set(collection_modal + ' > .body > .btn', 'onclick', 'ManagerCollectionPost.edit()')
			Modals.show(collection_modal)
		})
	},

	list_collations () {
		fetch(
			Apis.npoint('eaefe2d125e52b56f863')
		).then(
			json => json.json()
		).then(callback => {
			El.empty('#col-collation')

			_.forEach(callback, item => {
				El.append('#col-collation', `
					<option value='${ item }'>
						${ item }
					</option>
				`)
			})
		})
	},

}
const ManagerCollection = {

	modal () {
		$(collection_modal).empty()
		$(collection_modal).append(`
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
		$(collection_modal + ' > .title > .label').text('Create collection')
		$(collection_modal + ' > .body > .btn').attr('onclick', 'ManagerCollectionPost.create()')

		$('#col-name').val('')
		$('#col-privacy').val('public')
		$('#col-submit').text('Create')
		$('#col-collation').val('utf8_general_ci')

		Modals.show(collection_modal)
	},

	edit_modal (slug) {
		Storage.save('col-slug', slug)

		fetch(`${ Apis.core() }cloud/collections/get?slug=${ Storage.get('col-slug') }`).then( 
			json => json.json() 
		).then( callback => {
			$('#col-submit').text('Save')
			$('#col-name').val(callback.name)
			$('#col-privacy').val(callback.privacy)
			$('#col-collation').val(callback.collation)

			$(collection_modal + ' > .title > .label').text('Edit collection')
			$(collection_modal + ' > .body > .btn').attr('onclick', 'ManagerCollectionPost.edit()')
			Modals.show(collection_modal)
		})
	},

	list_collations () {
		fetch(
			Apis.npoint('eaefe2d125e52b56f863')
		).then(
			json => json.json()
		).then(callback => {
			$('#col-collation').empty()

			_.forEach(callback, item => {
				$('#col-collation').append(`
					<option value='${ item }'>
						${ item }
					</option>
				`)
			})
		})
	},

}
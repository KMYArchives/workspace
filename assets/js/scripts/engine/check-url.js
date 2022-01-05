const CheckURL = {

	core () {
		switch (Params.get_last()) {
			case 'tasks':
				Tasks.page_load()
				break

			case 'models':
				Models.page_load()
				break

			case 'hashes':
				Hashes.page_load()
				break

			case 'history':
				History.page_load()
				break

			case 'diagrams':
				Diagrams.page_load()
				break
				
			case 'contacts':
				Contacts.page_load()
				break

			default:
				Models.page_load()
				break
		}
	},

}
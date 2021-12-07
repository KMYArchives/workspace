const LoginVerify = {

	url () {
		var url = `${ URL.get_url_base() }login?p=${ URL.get_last_param() }`

		if (Find.search(URL.get_url_base(), 'localhost')) {
			url = Find.replace_all(
				url, 'workspace', 'website'
			)
		}

		if (URL.get_query('i') != undefined) { url = `${ url }&i=${ URL.get_query('i') }` }
		return `${ url }&w=true`
	},

	check_logged () {
		fetch(`${ Apis.core() }login/check-logged`).then( 
			json => json.json() 
		).then( callback => {
			if (callback.logged != true) {
				URL.open_url(
					this.url(), false
				)
			}
		})
	},

}
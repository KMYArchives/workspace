const LoginVerify = {

	url () {
		var url = `${ 
			URL.get_url_base() 
		}login?p=${ 
			Params.get_last() 
		}`

		if (Find.search(URL.get_url_base(), 'localhost')) {
			url = Find.replace_all(
				url, 'workspace', 'website'
			)
		}

		if (URL.has('i')) { url = `${ url }&i=${ Queries.get('i') }` }
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
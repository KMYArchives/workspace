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

		if (Queries.has('i')) { url = `${ url }&i=${ Queries.get('i') }` }
		return `${ url }&w=true`
	},

	check_logged () {
		axios.get(`${ Apis.core() }login/check-logged`).then( callback => {
			if (callback.data.logged != true) {
				console.log('not logged')
			}
		})
	},

}
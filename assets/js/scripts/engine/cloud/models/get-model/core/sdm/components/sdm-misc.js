const SDMMisc = {

	_copy () {
		GUI.message('isp-msg', 'Copied with successfully.', 3000)

		Copy.content(
			El.text(sdm_get + ' > .get-def')
		)
	},

	_clear () {
		El.empty(
			sdm_get + ' > .header',
			sdm_get + ' > .get-def',
		)
	},

	_search_param (term = null) {
		var params = ''

		if (term) {
			var _pattern = Str.slice(term, ':', 0),
				_term = Str.slice(term, ':', 1)

			params = `&term=${ term }`
			if (Find.search(term, ':')) {
				params = `&term=${ _term }&pattern=${ _pattern }`
			}
		}
		
		return params
	},

}
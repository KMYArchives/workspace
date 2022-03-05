const Apis = {

	core () { return `${ URL.get_url_base() }apis/` },

	json (file) { return `${ URL.get_url_base() }yuki/json/${ file }` },

	gravatar (gravatar, size = 300) { return `https://s.gravatar.com/avatar/${ gravatar }?s=${ size }` },

	frankfurter (params) { return `https://api.frankfurter.app/latest?amount=${ params.value }&from=${ params.from }&to=${ params.to }` },
	
}
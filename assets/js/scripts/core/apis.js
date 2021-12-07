const Apis = {

	core () { return `${ URL.get_url_base() }apis/` },

	npoint (slug) { return `https://api.npoint.io/${ slug }` },

	gravatar (gravatar, size = 300) { return `https://s.gravatar.com/avatar/${ gravatar }?s=${ size }` },

	frankfurter (params) { return `https://api.frankfurter.app/latest?amount=${ params.value }&from=${ params.from }&to=${ params.to }` },
	
}
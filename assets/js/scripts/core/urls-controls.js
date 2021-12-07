const URL = {

	get_url_base () {
		if (window.location.host == 'localhost') { 
			return window.location.origin + '/' + window.location.pathname.split('/')[1] + '/' 
		}
		
		return window.location.origin + '/'
	},

	get_query (query) {
		var match, 
			result = [], 
			regexp = new RegExp('(?:\\?|&)' + query + '=(.*?)(?=&|$)', 'gi')

		while ((match = regexp.exec(document.location.search)) !== null) { result.push(match[1]) }
		return result[0]
	},

	get_url (check_slash) {
		if (check_slash) {
			if (this.get_last_param() != '/') {
				return window.location.origin + window.location.pathname + '/'
			} else {
				return window.location.origin + window.location.pathname.replace(/^(.+?)\/*?$/, "$1")
			}
		} else {
			return window.location.origin + window.location.pathname.replace(/^(.+?)\/*?$/, "$1") + '/'
		}
	},

	add_query (query, value) {
		if (history.pushState) {
			var param = this.get_url().replace(/^(.+?)\/*?$/, "$1") + '?' + query + '=' + value
			
			window.history.pushState({
				path: param
			}, '', param)
		}
	},

	get_last_param (url = null) {
		if (url) {
			return url.split('/').slice(-1)[0] 
		} else {
			return window.location.pathname.split('/').slice(-1)[0] 
		}
	},

	open_url (url, url_base = true) {
		if (url_base == true) {
			window.location.href = this.get_url_base() + url
		} else {
			window.location.href = url
		}
	},

	change_url (url) { this.push_url(url.split('.').slice(-1)[0]) },

	remove_all_queries () { this.push_url(this.get_url().replace(/^(.+?)\/*?$/, "$1")) },

	push_url (url, data = null, title = null) { window.history.pushState(data, title, url) },

	remove_last_param () { this.push_url(this.get_url().substring(0, this.get_url().length - this.get_last_param().length - 2)) },

	set_last_param (last_param) { this.push_url(this.get_url().replace(/^(.+?)\/*?$/, "$1") + '/' + last_param.replace(/\//g, '')) },

}
const Str = {
	
	capitalize (string) {
		if (typeof string !== 'string') return ''
		return string.charAt(0).toUpperCase() + string.slice(1)
	},
	
	cut (string, length, ending = '...') {
		if (string.length > length) {
			return string.substring(0, length - ending.length) + ending
		} else {
			return string
		}
	},

	parse (json_content) { return JSON.parse(json_content) },

	slice (string, char, slice) { return string.split(char)[slice] },
	
	stringify (json_content, indent = 4) { return JSON.stringify(json_content, null, indent) },

}
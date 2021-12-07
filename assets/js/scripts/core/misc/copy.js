const Copy = {

	input (input) {
		$(input).select()
		document.execCommand('copy')
	},

	content (content) {
		var dummy = document.createElement('input')
		document.body.appendChild(dummy)
		dummy.setAttribute('value', content)
		dummy.select()

		if (document.execCommand('copy') == true) {
			document.body.removeChild(dummy)
			return true
		} else {
			document.body.removeChild(dummy)
			return false
		}
	},

}
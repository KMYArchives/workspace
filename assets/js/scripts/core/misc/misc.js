const Misc = {

	platform () {
		var platform = Str.slice(
			Str.slice(
				Find.replace_all(navigator.userAgent, ';', ''), '(', 1
			), ' ', 0
		).toLowerCase()

		return platform
	},

	gravatar (email) {
		if (Storage.has('gravatar') != true) {
			Encoder.toDataURL(Apis.gravatar(email), request => {
				Storage.save('gravatar', request)
				return request
			})
		} else {
			return Storage.get('gravatar')
		}
	},

	error_code (code) {
		switch (code) {
			case 'error-email': return 'Email invalid'
			case 'error-otp-invalid': return 'OTP Code invalid'
			case 'error-otp-expired': return 'OTP Code expired'
			case 'error-created-db': return 'Data not registered in DB'
			case 'error-email-exists': return 'The email already exists'
			case 'error-pass-matched': return 'Passwords are not the same'
			case 'error-login-auth': return 'Email or password are incorrect'
		}
	},

	copy_input (input) {
		$(input).select()
		if (document.execCommand('copy') == true) {
			return true
		} else {
			return false
		}
	},

	copy_element (content) {
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

	download (link, name = null) {
		var a = document.createElement('a')
	
		a.href = link
		a.style.display = 'none'
		if (name) { a.download = name }

		document.body.appendChild(a)
		a.click()

		window.URL.revokeObjectURL(link)
	},

	change_type_input (input, element = 'toggle-type-input') {
		if ($(input).attr('type') == 'password') {
			$(input).attr('type', 'text')
			$('#' + Find.replace_all(element, '#', '')).addClass('fa-eye')
			$('#' + Find.replace_all(element, '#', '')).removeClass('fa-eye-slash')
		} else {
			$(input).attr('type', 'password')
			$('#' + Find.replace_all(element, '#', '')).removeClass('fa-eye')
			$('#' + Find.replace_all(element, '#', '')).addClass('fa-eye-slash')
		}
	},

}
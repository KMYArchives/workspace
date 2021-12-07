const Random = {

	slug (length) {
		var value = '',
			charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	
		for (var i = 0, n = charset.length; i < length; ++i) { 
			value += charset.charAt(
				Math.floor(
					Math.random() * n
				)
			) 
		}
	
		return value
	},
	
	password (length) {
		var value = '',
			charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@?!#$%&*^~<>(){}[]-_+='
	
		for (var i = 0, n = charset.length; i < length; ++i) { 
			value += charset.charAt(
				Math.floor(
					Math.random() * n
				)
			) 
		}
	
		return value
	},

	password_b64 (length) {
		return Base64.bota(
			this.password(length)
		)
	},

	slug_range (min, max) {
		return this.slug(
			Math.floor(
				Math.random() * (max - min + 1) + min
			)
		)
	},

}
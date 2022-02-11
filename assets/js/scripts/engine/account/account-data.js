const AccountData = {

	details () {
		setTimeout( e => {
			this.request_details()
		}, anim_time * 3)
	},

	request_details () {
		axios.get(`${ Apis.core() }account/details`).then( callback => {
			this.get_data(callback.data)
		})
	},

	get_data (callback) {
		Misc.gravatar(callback.gravatar)

		El.text(
			'#name-user', Humanize.capitalize(
				callback.name
			)
		)

		setTimeout( e => {
			Attr.set(
				'#avatar-user', 'src', Storage.get('gravatar')
			)
		}, anim_time * 3)
	},

}
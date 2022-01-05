const AccountData = {

	details () {
		setTimeout( e => {
			this.request_details()
		}, anim_time)
	},

	request_details () {
		var loaded = false

		var Interval = setInterval( e => {
			if (loaded != true) {
				fetch(`${ Apis.core() }account/details`).then( 
					json => json.json() 
				).then( callback => {
					loaded = true
					this.get_data(callback)
				})
			} else {
				clearInterval(Interval)
			}
		}, anim_time * 2)
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
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
		$('#name-user').text(Humanize.capitalize(callback.name))

		setTimeout( e => {
			$('#avatar-user').attr(
				'src', Storage.get('gravatar')
			)
		}, anim_time * 3)
	},

}
const ShareMisc = {

	links (item, el) {
		var value

		switch (item) {
			case 'cli': 
				value = this.import_cli()
				break

			case 'raw':
				value = this.link_raw()
				break

			case 'direct':
				value = this.link_direct()
				break
		}
		
		ShareModel.toggle_sub_options()
		El.value(share_code_box + ' > .links > input', value)
		El.text(share_code_box + ' > .options > .text', El.text('#' + el.id))
	},

	social_media (social) {
		switch (social) {
			case 'vk': return `https://vk.com/share.php?url=${ this.link_direct() }`
			case 'reddit': return `https://www.reddit.com/submit?url=${ this.link_direct() }`
			case 'twitter': return `https://twitter.com/intent/tweet?url=${ this.link_direct() }`
			case 'facebook': return `https://www.facebook.com/sharer.php?u=${ this.link_direct() }`
		}
	},

	import_cli () { return `wks import ${ Queries.get('i') }` },

	link_direct () { return URL.get_url_base() + Queries.get('i') },

	link_raw () { return URL.get_url_base() + 'raw/' + Queries.get('i') },

}
const ShareMisc = {

	actived (el) {
		$(share_code_box + ' > .sub-options > .option').removeClass(act_class)
		$(el).addClass(act_class)
	},

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

		$(share_code_box + ' > .links > input').val(value)
		$(share_code_box + ' > .options > .text').text($(el).text())
		
		this.actived(el)
		ShareModel.toggle_sub_options()
	},

	social_media (social) {
		switch (social) {
			case 'vk': return `https://vk.com/share.php?url=${ this.link_direct() }`
			case 'reddit': return `https://www.reddit.com/submit?url=${ this.link_direct() }`
			case 'twitter': return `https://twitter.com/intent/tweet?url=${ this.link_direct() }`
			case 'facebook': return `https://www.facebook.com/sharer.php?u=${ this.link_direct() }`
		}
	},

	import_cli () { return `wks import ${ URL.get_query('i') }` },

	link_direct () { return URL.get_url_base() + URL.get_query('i') },

	link_raw () { return URL.get_url_base() + 'raw/' + URL.get_query('i') },

}
const EmbedDiagram = {

	page () {
		return Find.replace(
			URL.get_url(), 'diagrams/', Queries.get('i')
		)
	},

	actived (el) {
		Classes.remove(share_dgr_box + ' > .sub-options > .option')
		Classes.add(el, act_class)
	},

	options (item, el) {
		var value

		switch (item) {
			case 'page': 
				value = this.page()
				break

			case 'html':
				value = this.html()
				break

			case 'bbcode':
				value = this.bbcode()
				break

			case 'direct': 
				value = this.direct()
				break

			case 'markdown':
				value = this.markdown()
				break
		}

		El.value(share_dgr_box + ' > .links > input', value)

		El.text(
			share_dgr_box + ' > .options > .text', El.text(el)
		)
		
		this.actived(el)
		ShareDiagram.toggle_sub_options()
	},

	social_media (social) {
		var link = EmbedDiagram.direct()

		switch (social) {
			case 'vk': return `https://vk.com/share.php?url=${ link }`
			case 'reddit': return `https://www.reddit.com/submit?url=${ link }`
			case 'twitter': return `https://twitter.com/intent/tweet?url=${ link }`
			case 'facebook': return `https://www.facebook.com/sharer.php?u=${ link }`
			case 'pinterest': return `https://pinterest.com/pin/create/link?media=${ link }`
		}
	},

	bbcode () { return `[img](${ this.direct() })[/img]` },

	direct () { return Attr.get(diagram_modal + ' > .viewer > img', 'src') },

	markdown () { return `<![Diagram by ${ Str.slice(document.title, ' - ', 0) }](${ this.direct() })` },

	html () { return `<img src='${ this.direct() }' title='Diagram by ${ Str.slice(document.title, ' - ', 0) }'>` },

}
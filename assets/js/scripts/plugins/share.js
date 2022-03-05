const Share = {

	box (type) {
		var el

		if (type == 'diagrams') {
			el = share_dgr_box
		} else if (type == 'models') {
			el = share_code_box
		}

		return el + ' > .social'
	},

	loader (link, type) {
		axios.get(`${ URL.get_url_base() }yuki/json/share-links`).then( callback => {
			_.forEach( callback.data, value => {
				if (value.type.indexOf(type) !== -1) {
					El.append(this.box(type), `
						<a href="${
							Find.replace_all(
								value.url, '${url}', link
							)
						}" target='_blank' class='${
							value.icon
						}' title='Share on ${
							value.name
						}'></a>
					`)
				}
			})
		})
	},

}
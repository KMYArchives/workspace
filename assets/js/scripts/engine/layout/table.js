const Table = {

	header (items) {
		this.clean_thead()
		$(this.thead()).append(`<tr></tr>`)

		_.forEach(items, item => {
			$(`${ 
				this.thead()
			} > tr`).append(`
				<th>${ item }</th>
			`)
		})
	},

	clean_table () {
		this.clean_tbody()
		this.clean_thead()
	},

	clean_thead () { 
		$(
			this.thead()
		).empty()
	},

	clean_tbody () {
		$(
			this.tbody()
		).empty()
	},

	del_rows (items) {
		if (items != '*' || items[0] != '*') {
			_.forEach(items, item => {
				$(`
					${ this.tbody() } > .${ item }
				`).remove()
			})
		} else {
			this.clean_tbody()
		}
	},

	add_rows (items, append = false) {
		var slug_class, item_id
		if (append != true) { this.clean_tbody() }

		_.forEach(items, item => {
			slug_class = Random.slug(24)
			if (item.slug != undefined) { slug_class = item.slug }
			item_id = `${ this.tbody() } > #${ slug_class }`

			$(
				this.tbody()
			).append(`
				<tr id='${
					slug_class
				}' onclick="${
					item.click
				}"></tr>
			`)

			_.forEach(item.rows, row_text => {
				$(item_id).append(`
					<td>${ 
						row_text 
					}</td>
				`)
			})
		})
	},

	thead () {  return `${ user_container } > table > thead` },

	tbody () {  return `${ user_container } > table > tbody` },

}
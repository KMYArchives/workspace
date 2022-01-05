const Table = {

	thead (table = null) {
		if (table) {
			return `${ table } > thead`
		} else {
			return `${ user_container } > table > thead`
		}
	},

	tbody (table = null) {
		if (table) {
			return `${ table } > tbody`
		} else {
			return `${ user_container } > table > tbody`
		}
	},

	clean_table (table = null) {
		this.clean_tbody(table)
		this.clean_thead(table)
	},

	clean_thead (table = null) {
		El.empty(
			this.thead(table)
		)
	},

	clean_tbody (table = null) {
		El.empty(
			this.tbody(table)
		)
	},

	header (items, table = null) {
		this.clean_thead(table)
		El.append(this.thead(table), `<tr></tr>`)

		_.forEach(items, item => {
			El.append(`${ 
				this.thead(table)
			} > tr`, `
				<th>${ item }</th>
			`)
		})
	},

	del_rows (items, table = null) {
		if (items != '*' || items[0] != '*') {
			_.forEach(items, item => {
				El.remove(`
					${ this.tbody(table) } > .${ item }
				`)
			})
		} else {
			this.clean_tbody(table)
		}
	},

	add_rows (items, append = false, table = null) {
		var item_id,
			click = '',
			slug_class

		if (append != true) { this.clean_tbody(table) }
		_.forEach(items, item => {
			slug_class = Slug.letters(32)
			if (item.slug != undefined) { slug_class = item.slug }

			if (item.click != undefined) {
				click =  `onclick="${
					item.click
				}"`
			}
			
			item_id = `${ this.tbody(table) } > #${ slug_class }`
			El.append(this.tbody(table), `
				<tr id='${
					slug_class
				}' ${
					click
				}></tr>
			`)

			_.forEach(item.rows, row_text => {
				El.append(item_id, `
					<td>${ 
						row_text 
					}</td>
				`)
			})
		})
	},

}
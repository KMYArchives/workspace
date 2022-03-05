const VisualMode = {

	layout () {
		Table.clean_table(table_render_visual)

		Table.header([
			'Field', 'Type', 'Key', 'Null', 'Default', 'Extra'
		], table_render_visual)
	},

	value (value) {
		switch (value) {
			case '':
			case null:
			case 'false':
				return "<div class='none'>None</div>"

			default: return Str.cut(value, 32)
		}
	},

	fields (colunms) {
		this.layout()
		colunms.forEach( field => { this.row_layout(field) })
	},

	row_layout (field) {
		Table.add_rows([
			{
				rows: [
					Str.cut(field.Field, 32),
					Str.cut(field.Type, 32),
					this.value(field.Key),
					field.Null,
					this.value(field.Default),
					this.value(field.Extra)
				]
			}
		], true, table_render_visual)
	},

}
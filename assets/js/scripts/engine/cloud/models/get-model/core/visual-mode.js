const VisualMode = {

	layout () {
		$(visual_mode).empty()
		$(visual_mode).append(`
			<table id='${ Find.replace(table_render_visual, visual_mode + ' > #', '') }'>
				<thead>
					<tr>
						<th>Field</th>
						<th>Type</th>
						<th>Key</th>
						<th>Null</th>
						<th>Default</th>
						<th>Extra</th>
					</tr>
				</thead>
				
				<tbody></tbody>
			</table>
		`)
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
		$(visual_mode + ' > table > tbody').append(`
			<tr>
				<td>${ Str.cut(field.Field, 32) }</td>
				<td>${ Str.cut(field.Type, 32) }</td>
				<td>${ this.value(field.Key) }</td>
				<td>${ field.Null }</td>
				<td>${ this.value(field.Default) }</td>
				<td>${ this.value(field.Extra) }</td>
			</tr>
		`)
	},

}
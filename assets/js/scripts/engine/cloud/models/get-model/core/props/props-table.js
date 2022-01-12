const PropsTable = {

	toggle () {
		Classes.toggle(props_btn, act_class)

		if (El.is_visible(properties)) {
			El.hide(properties)
		} else {
			El.show(properties)
		}
	},

	get (callback) {
		El.empty(properties)
		El.append(properties, `
			<div class='item'>Charset: ${ callback.charset }</div>
			<div class='item'>Engine: ${ callback.engine }</div>
			<div class='item'>Auto increment: ${ callback.auto_increment }</div>
			<div class='item'>Row format: ${ callback.row_format }</div>
			<div class='item'>Collation: ${ callback.collation }</div>
			<div class='item'>Temporary: ${ callback.temporary }</div>
			<div class='comment-area'></div>
		`)

		CommentTable.get(callback)
	}

}
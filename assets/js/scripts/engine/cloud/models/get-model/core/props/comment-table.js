const CommentTable = {

	toggle () {
		Classes.toggle('#btn-comment-table-toggle', act_class)

		if (El.is_visible(
			this.element_comment()
		)) {
			El.hide(this.element_comment())
		} else {
			El.show(this.element_comment())
		}
	},

	get (callback) {
		if (callback.comment) {
			El.append(this.element(), `
				<div class='header' id='btn-comment-table-toggle' onclick='CommentTable.toggle()'>
					Comment
					<div class='fas fa-comment-alt'></div>
				</div>

				<div class='comment'>${ callback.comment }</div<>
			`)
		}
	},

	element () { return properties + ' > .comment-area' },

	element_comment () { return this.element() + ' > .comment' },

}
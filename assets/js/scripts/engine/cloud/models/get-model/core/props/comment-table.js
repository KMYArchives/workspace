const CommentTable = {

	toggle (el) {
		Classes.toggle(el)
		$(this.element() + ' > .comment').slideToggle(anim_time)
	},

	get (callback) {
		if (callback.comment) {
			$(this.element()).append(`
				<div class='header' onclick='CommentTable.toggle(this)'>
					Comment
					<div class='fas fa-comment-alt'></div>
				</div>

				<div class='comment'>${ callback.comment }</div<>
			`)
		}
	},

	element () { return properties + ' > .comment-area' },

}
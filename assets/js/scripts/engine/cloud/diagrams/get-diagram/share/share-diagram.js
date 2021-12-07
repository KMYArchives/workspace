const ShareDiagram = {

	layout () {
		setTimeout( e => {
			$(share_dgr_box).empty()
			$(share_dgr_box).append(`
				<div class='social'>
					<a href="${ EmbedDiagram.social_media('facebook') }" target='_blank' class='fab fa-facebook'></a>
					<a href="${ EmbedDiagram.social_media('twitter') }" target='_blank' class='fab fa-twitter'></a>
					<a href="${ EmbedDiagram.social_media('reddit') }" target='_blank' class='fab fa-reddit'></a>
					<a href="${ EmbedDiagram.social_media('pinterest') }" target='_blank' class='fab fa-pinterest'></a>
				</div>

				<div class='options' onclick="ShareDiagram.toggle_sub_options()">
					<div class='text'>Page</div>
					<div class='fas fa-chevron-down'></div>
				</div>

				<div class='sub-options'>
					<div class='option ${ Find.replace(act_class, '.', '') }' onclick="EmbedDiagram.options('page', this)">Page</div>
					<div class='option' onclick="EmbedDiagram.options('direct', this)">Direct</div>
					<div class='option' onclick="EmbedDiagram.options('html', this)">HTML</div>
					<div class='option' onclick="EmbedDiagram.options('bbcode', this)">BBCode</div>
					<div class='option' onclick="EmbedDiagram.options('markdown', this)">Markdown</div>
				</div>

				<div class='links'>
					<input type='text' value='${ EmbedDiagram.page() }' onclick="Misc.copy_input(this)" readonly>
				</div>
			`)
		}, anim_time)
	},

	toggle (el) {
		Classes.toggle(el)
		$(share_dgr_box).fadeToggle(anim_time)
	},

	toggle_sub_options () {
		$('.options > .fas').remove()

		if (Classes.is_visible('.sub-options')) {
			$('.options').append(`<div class='fas fa-chevron-down'></div>`)
		} else {
			$('.options').append(`<div class='fas fa-chevron-up'></div>`)
		}

		Classes.toggle('.options')
		$('.sub-options').slideToggle(anim_time)
	}

}
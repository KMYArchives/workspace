const ShareModel = {

	layout () {
		$(share_code_box).empty()
		$(share_code_box).append(`
			<div class='social'>
				<a href="${ ShareMisc.social_media('facebook') }" target='_blank' class='fab fa-facebook'></a>
				<a href="${ ShareMisc.social_media('twitter') }" target='_blank' class='fab fa-twitter'></a>
				<a href="${ ShareMisc.social_media('reddit') }" target='_blank' class='fab fa-reddit'></a>
				<a href="${ ShareMisc.social_media('vk') }" target='_blank' class='fab fa-vk'></a>
			</div>

			<div class='options' onclick="ShareModel.toggle_sub_options()">
				<div class='text'>Direct</div>
				<div class='fas fa-chevron-down'></div>
			</div>

			<div class='sub-options'>
				<div class='option ${ Find.replace(act_class, '.', '') }' onclick="ShareMisc.links('direct', this)">Direct</div>
				<div class='option' onclick="ShareMisc.links('cli', this)">CLI</div>
				<div class='option' onclick="ShareMisc.links('raw', this)">Raw</div>
			</div>

			<div class='links'>
				<input type='text' value='${ ShareMisc.link_direct() }' onclick="Misc.copy_input(this)" readonly>
			</div>
		`)
	},

	toggle (el) {
		$(send_to_box).hide()
		$(models_linked_box).hide()
		$(toolbar_code + ' > #send-model').removeClass(act_class)
		$(toolbar_code + ' > #linked-model').removeClass(act_class)

		Classes.toggle(el)
		$(share_code_box).fadeToggle(anim_time)
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
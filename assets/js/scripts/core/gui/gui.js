const GUI = {

	toggle_boxes (el) {
		this.toggle_class(el, act_class)
	
		if ($(el).attr('hide') != undefined) {
			$(el).attr('hide').split(',').forEach( element => { 
				$('#' + element.Find.replace(/\s/g, '')).hide() 
			})
		}
	
		if ($(el).attr('rem-act') != undefined) {
			$(el).attr('rem-act').split(',').forEach( element => { 
				$('.' + element.Find.replace(/\s/g, '')).removeClass(act_class) 
			})
		}
	
		$('#' + $(el).attr('toggle')).fadeToggle(anim_time)
	},

	empty_multiple (elements) {
		elements.forEach( element => {
			$(element).empty()
		})
	},
	
	get_func_checked (el, icon = 'fa-check') {
		var element = $('#' + 
			Find.replace_all(el, '#', '')
		).html()
	
		if (this.has_class(element, icon) == true) { return true }
		return false
	},

	message (element, text, delay = 2500, time = anim_time) {
		$('#' + element).empty()
		$('#' + element).text(text)
		$('#' + element).fadeIn(time)
		setTimeout( e => { $('#' + element).fadeOut(time) }, delay)
	},

}
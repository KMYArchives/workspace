const Classes = {
	
	toggle (el, selected = act_class) {
		if (!($(el).parent().find(el).hasClass(selected))) {
			$(el).parent().find(el).addClass(selected)
		} else {
			$(el).parent().find(el).removeClass(selected)
		}
	},
	
	has (element, selected = act_class) {
		if ($(element).parent().find(element).hasClass(selected)) {
			return true
		} else {
			return false
		}
	},

	replace (rem, add, selected = act_class) {
		rem.forEach( rem_class => { $(rem_class).removeClass(selected) })
		$(add).addClass(selected)
	},

	is_visible (ui_element) { return $(ui_element).is(':visible') },

}
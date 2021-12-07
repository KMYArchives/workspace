const Modals = {
	
	show (modal) {
		if ($(mask).is(':visible') != true) { $(mask).fadeIn(anim_time) }
		if ($(modal).attr('modal') != undefined) { modal = $(modal).attr('modal') }
	
		$('#' + 
			Find.replace_all(
				modal, '#', ''
			)
		).fadeIn(anim_time)
	},
	
	close (window) {
        $(mask).fadeOut(anim_time)
		$(window).fadeOut(anim_time)
	},
	
	close_all (clean_params = true, hide_mask = true) {
		if (clean_params == true) {
			slice_url = Str.slice(
				Find.replace(
					URL.get_url(), 'localhost/', ''
				), '/', 3
			)
		
			URL.remove_all_queries()
			Storage.delete([ 'cc-item', 'cc-list', 'cc-list2' ])
		}

		if (Find.search(URL.get_url(), 'account')) {
			if (Find.in_array(URL.get_last_param(), [ 
				'licenses', 'devices', 'settings', 'orders', 'cloud', 'hashes', 'diagrams', 'settings', 'table-models'
			]) != true) {
				URL.remove_last_param()
			}
		}
		
		if (hide_mask == true) { $(mask).fadeOut(anim_time) }
		$(modal).fadeOut(anim_time)
		
		if (clean_params == true) {
			if (Find.in_array(slice_url, [ 
				'login', 'signup', 'forget', 'telemetry' 
			])) {
				Home.go_page()
			}
		}
	},

}
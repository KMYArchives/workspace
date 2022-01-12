const SDMList = {

	show () {
		SDMGet.hide()
		Classes.add('#sql-minidoc', act_class)

		setTimeout( e => {
			El.show(sdm_list)
		}, anim_time)
	},

	hide () {
		El.hide(sdm_list)
		Classes.remove('#sql-minidoc', act_class)
	},
	
	toggle () {
		SDMGet.hide()
		Classes.toggle('#sql-minidoc', act_class)

		if (Classes.is_visible(sdm_list)) {
			this.hide()
		} else {
			this.show()
		}
	},

	search () {
		clearTimeout(timeout)

		var timeout = setTimeout( e => {
			if (El.value('.search-area') != '') {
				this.clear()
				SDMAjax.list(0, El.value('.search-area'))
			} else {
				SDMAjax.list()
			}
		}, 500)
	},

	scroll () {
		var list = El.get(sdm_list + ' > .list'),
			count_items = El.count(sdm_list + ' > .list > .item')

		if (list.offsetHeight + list.scrollTop >= list.scrollHeight) {  
			if (Storage.get('sdm-total-items') > count_items) {
				SDMAjax.list(count_items)
			}
		}
	},

	clear () { El.empty(sdm_list + ' > .list') },

}
const Navbar = {

	init () {
		if (!El.has(this.menu_element())) {
			El.append('body', `
				<div class='nav'>
					<a class='logo' id='${ Find.replace_all(account_avatar, '#', '') }'></a>
					<div class='menu'></div>
				</div>
			`)
		}
	},

	del (items) {
		var get_id, get_class_name

		_.forEach(items, item => {
			get_class_name = `${ 
				this.menu_element() 
			} > .${ item }`

			get_id = `${ 
				this.menu_element() 
			} > #${ item }`
			
			if (El.has(get_id)) {
				El.remove(get_id)
			} else {
				El.remove(get_class_name)
			}
		})
	},

	actived (item) {
		var get_id, get_class_name

		El.get(`${ 
			this.menu_element() 
		} > .btn-item`, 'selectorAll').forEach( btn => {
			get_class_name = `${ 
				this.menu_element() 
			} > .${ Str.slice(
					btn.className, ' ', 1
				)
			}`

			get_id = `${ 
				this.menu_element() 
			} > #${ 
				btn.id
			}`

			if (El.has(get_id)) {
				Classes.remove(get_id, act_class)
			} else {
				Classes.remove(get_class_name, act_class)
			}
		})

		Classes.add(`#${ item }`, act_class)
	},

	set (items, append = true) {
		var click = '',
			item_id = '',
			actived_class

		_.forEach(items, item => {
			item_id = item.id.replace('#', '')
			if (append != true) { this.clean() }

			if (item.click != undefined) {
				click =  `onclick="${
					item.click
				}"`
			}
			
			if (item.actived != undefined && item.actived == true) {
				actived_class = 'actived'
			} else {
				actived_class = ''
			}
			
			El.append(this.menu_element(), `
				<a class='btn-item ${
					item_id + ' ' + actived_class
				}' id='${
					item_id
				}' ${
					click
				}'>
					<div class='${
						item.icon
					}'></div>

					<span class='hovercard'>
						<div class='text'>${
							item.title
						}</div>
					</span>
				</a>
			`)
		})
	},

	menu_element () { return '.nav > .menu' },

	clean () { El.empty(this.menu_element()) },

}
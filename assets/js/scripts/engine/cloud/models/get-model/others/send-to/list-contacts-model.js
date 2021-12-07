const ListContactsModel = {

	list () {
		fetch(`${ Apis.core() }contacts/list`).then( 
			json => json.json() 
		).then( callback => {
			$(send_to_box + ' > .list').empty()
			
			if (callback.total > 0) {
				_.forEach(_.orderBy(callback.list, 'name', 'asc'), contact => {
					this.item_layout(contact)
				})
			} else {
				$(send_to_box + ' > .list').append(`<div class='none'>You no have contacts</div>`)
			}
		})
	},

	item_layout (contact) {
		$(send_to_box + ' > .list').append(`
			<div class='contact'>
				<img src='${ Misc.gravatar(contact.gravatar) }'>
				<div class='name'>${ contact.name }</div>

				<div class='fas fa-share' onclick="SendToModel.send(this)" title='Send'></div>
				${ this.favorite_item(contact) }'
			</div>
		`)
	},

	favorite_item (contact) {
		var icon, title

		if (Find.in_array(contact.favorited, [ true, 'true' ])) {
			icon = 'fas fa-heart'
			title = 'Remove favorite'
		} else {
			icon = 'far fa-heart'
			title = 'Favorite contact'
		}

		return `<div class='${ icon }' onclick="ContactsModelMisc.favorite('${ contact.slug }')" title='${ title }'></div>`
	},

}
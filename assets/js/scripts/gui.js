$( e => {

	Layout.page()
	CheckURL.core()
	LoginVerify.check_logged()

	Classes.add([
		modal,
		notif_box,
		account_box,
		contacts_box,
		diagram_modal,
		confirm_modal,
		collections_box,
		code_view_modal,
		collection_modal
	], 'animate__animated animate__zoomIn animate__faster')

	Events.click(notif_btn, e => {
		Classes.toggle(notif_btn, act_class)
		Classes.remove(contacts_btn, act_class)
		Classes.remove(account_avatar, 'logo-actived')
		
		El.hide([ contacts_box, account_box ])
		if (Classes.has(notif_btn, act_class)) {
			El.show(notif_box)
		} else {
			El.hide(notif_box)
		}
	})

	Events.click(contacts_btn, e => {
		Classes.remove(notif_btn, act_class)
		Classes.toggle(contacts_btn, act_class)
		Classes.remove(account_avatar, 'logo-actived')

		El.hide([ notif_box, account_box ])
		if (Classes.has(contacts_btn, act_class)) {
			El.show(contacts_box)
		} else {
			El.hide(contacts_box)
		}
	})

	Events.click(account_avatar, e => {
		Classes.remove(notif_btn, act_class)
		Classes.remove(contacts_btn, act_class)
		Classes.toggle(account_avatar, 'logo-actived')

		El.hide([ notif_box, contacts_box ])
		if (Classes.has(account_avatar, 'logo-actived')) {
			El.show(account_box)
		} else {
			El.hide(account_box)
		}
	})

	Events.click(mask, e => { Modals.close_all() })

})
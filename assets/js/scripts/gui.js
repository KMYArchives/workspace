$( e => {

	Layout.page()
	CheckURL.core()
	LoginVerify.check_logged()

	$(notif_btn).click( e => {
		$(contacts_btn).removeClass(act_class)
		$(account_avatar).removeClass('logo-actived')
		Classes.toggle(notif_btn)

		$(account_box).hide()
		$(contacts_box).hide()
		$(notif_box).fadeToggle(anim_time)
	})

	$(contacts_btn).click( e => {
		$(notif_btn).removeClass(act_class)
		$(account_avatar).removeClass('logo-actived')
		Classes.toggle(contacts_btn)

		$(notif_box).hide()
		$(account_box).hide()
		$(contacts_box).fadeToggle(anim_time)
	})

	$(account_avatar).click( e => {
		$(notif_btn).removeClass(act_class)
		$(contacts_btn).removeClass(act_class)
		Classes.toggle(account_avatar, 'logo-actived')

		$(notif_box).hide()
		$(contacts_box).hide()
		$(account_box).fadeToggle(anim_time)
	})

	$(mask).click( e => { Modals.close_all() })

})
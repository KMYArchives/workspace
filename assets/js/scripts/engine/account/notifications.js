const Notifications = {

	list () {},

	layout () {
		$('body').append(`
			<div class='notif-box' id='${ Find.replace_all(notif_box, '#', '') }'>
				<div class='header'>
					<div class='label'>Notification's</div>
					<div class='total'>0 item's</div>
				</div>

				<div class='list'>
					<div class='none'>You don't have any notifications.</div>
				</div>
			</div>
		`)
	},

	denied (el) {},

	activated (el) {},

	item_layout (notif) {},

}
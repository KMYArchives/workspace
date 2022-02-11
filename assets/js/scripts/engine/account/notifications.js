const Notifications = {

	list () {},

	layout () {
		El.append('body', `
			<div class='notify-box' id='${ Find.replace_all(notif_box, '#', '') }'>
				<div class='header'>
					<div class='label'>Notification's</div>

					<div class='right'>
						<div class='fas fa-check-circle'></div>
					</div>

					<div class='total'>0 item's</div>
				</div>

				<div class='list'>
					<div class='item'>
						<div class='header'>
							<img src='https://www.gravatar.com/avatar/588f9be358f58984d3f9cc75c7ba23e7?s=300' class='avatar'>
							
							<div class='info'>
								<div class='name'>Emily Silva</div>
								<div class='time'>2021-01-30 13:23:35</div>
							</div>
						</div>

						<div class='text'>lorem dolor sit name</div>
						
						<div class='btn'>Accept</div>
						<div class='btn'>Deny</div>
					</div>
				</div>
			</div>
		`)
	},

	denied (el) {},

	activated (el) {},

	item_layout (notif) {},

}
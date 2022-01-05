const Contacts = {

	layout () {
		El.append('body', `
			<div class='contacts-box' id='${ Find.replace_all(contacts_box, '#', '') }'>
				<div class='title'>
					<div class='label'>Contact's</div>

					<div class='fas fa-plus'></div>
					<div class='total'>0 item's</div>
				</div>

				<div class='header'>
					<div class='tab actived'>All</div>
					<div class='tab'>Favorites</div>
				</div>

				<div class='list'>
					<div class='none'>You don't have any contacts.</div>
				</div>
			</div>
		`)
	},

}
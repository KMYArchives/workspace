const Layout = {

	page () {
		$('body').empty()
	
		this.modals()
		this.top_bar()
		this.sidebar()

		this.content()
		this.left_box()
		this.account_box()

		Contacts.layout()
		AccountData.details()
		Notifications.layout()
	},

	modals () {
		$('body').append(`
			<div class='mask'></div>
			<div class='code-mdl modal' id='${ Find.replace(code_view_modal, '#', '') }'></div>
			<div class='diagram-mdl modal' id='${ Find.replace(diagram_modal, '#', '') }'></div>
			<div class='confirm-mdl modal' id='${ Find.replace(confirm_modal, '#', '') }'></div>
			<div class='collection-mdl modal' id='${ Find.replace(collection_modal, '#', '') }'></div>
		`)
	},

	top_bar () {
		$('body').append(`
			<div class='top-bar'>
				<div class='right'>
					<div class='fas fa-users' id='${ Find.replace_all(contacts_btn, '#', '') }'></div>
					<div class='fas fa-bell' id='${ Find.replace_all(notif_btn, '#', '') }'></div>
				</div>
			</div>
		`)
	},

	sidebar () {
		$('body').append(`
			<div class='sidebar'>
				<a class='logo' id='${ Find.replace_all(account_avatar, '#', '') }'></a>

				<a class='item' id='search-box' onclick=''>
					<div class='fas fa-search'></div>

					<span class='hovercard'>
						<div class='text'>Search</div>
					</span>
				</a>

				<a class='item actived' id='tab-models' onclick='Models.page_load()'>
					<div class='fas fa-table'></div>

					<span class='hovercard'>
						<div class='text'>Models</div>
					</span>
				</a>

				<a class='item' id='tab-hashes' onclick='Hashes.page_load()'>
					<div class='fas fa-fingerprint'></div>
					
					<span class='hovercard'>
						<div class='text'>Hashes</div>
					</span>
				</a>

				<a class='item' id='tab-diagrams' onclick='Diagrams.page_load()'>
					<div class='fas fa-project-diagram'></div>
					
					<span class='hovercard'>
						<div class='text'>Diagrams</div>
					</span>
				</a>

				<a class='item'>
					<div class='fas fa-stream'></div>
					
					<span class='hovercard'>
						<div class='text'>Tasks</div>
					</span>
				</a>

				<a class='item'>
					<div class='fas fa-history'></div>
					
					<span class='hovercard'>
						<div class='text'>History</div>
					</span>
				</a>

				<a class='item'>
					<div class='fas fa-sync-alt'></div>
					
					<span class='hovercard'>
						<div class='text'>Sync</div>
					</span>
				</a>
			</div>
		`)
	},

	content () {
		$('body').append(`
			<div class='content' id='${ Find.replace_all(user_container, '#', '') }'>
				<div class='filter-area'></div>

				<table>
					<thead></thead>
					<tbody></tbody>
				</table>
			</div>
		`)
	},

	left_box () {
		$('body').append(`
			<div class='left-box' id='${ Find.replace_all(side_box, '#', '') }'></div>
			<div class='collections' id='${ Find.replace_all(collections_box, '#', '') }'></div>
		`)

		Collections.layout()
	},
	
	account_box () {
		$('body').append(`
			<div class='account-box' id='${ Find.replace_all(account_box, '#', '') }'>
				<div class='info-user'>
					<img class='avatar' id='avatar-user'>
					<div class='name' id='name-user'></div>
					<div class='text'>Manage your account</div>
				</div>

				<div class='menu'>Help</div>
				<div class='menu'>Upgrade</div>
				<div class='menu' onclick="Settings.show_modal()">Setting's</div>
				<div class='menu' onclick="Confirm.run('logoff')">Disconnect</div>
			</div>
		`)
	},

}
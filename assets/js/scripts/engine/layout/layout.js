const Layout = {

	page () {
		El.empty('body')
		Navbar.init()
	
		this.modals()
		this.navbar()
		this.top_bar()

		this.content()
		this.left_box()
		this.account_box()

		Contacts.layout()
		AccountData.details()
		Notifications.layout()
	},

	modals () {
		El.append('body', `
			<div class='mask'></div>
			<div class='code-mdl ${ Find.replace(modal, '.', '') }' id='${ Find.replace(code_view_modal, '#', '') }'></div>
			<div class='diagram-mdl ${ Find.replace(modal, '.', '') }' id='${ Find.replace(diagram_modal, '#', '') }'></div>
			<div class='confirm-mdl ${ Find.replace(modal, '.', '') }' id='${ Find.replace(confirm_modal, '#', '') }'></div>
			<div class='collection-mdl ${ Find.replace(modal, '.', '') }' id='${ Find.replace(collection_modal, '#', '') }'></div>
		`)
	},

	navbar () {
		Navbar.set([
			{
				title: 'Models',
				id: 'tab-models',
				icon: 'fas fa-table',
				click: "Models.page_load()"
			},
			{
				title: 'Hashes',
				id: 'tab-hashes',
				icon: 'fa-solid fa-fingerprint',
				click: "Hashes.page_load()",
			},
			{
				title: 'Diagrams',
				id: 'tab-diagrams',
				click: "Diagrams.page_load()",
				icon: 'fas fa-project-diagram',
			},
			{
				title: 'Tasks',
				id: 'tab-tasks',
				icon: 'fas fa-stream',
				//click: "Tasks.page_load()",
			},
			{
				title: 'History',
				id: 'tab-history',
				icon: 'fas fa-history',
				//click: "Diagrams.page_load()",
			},
			{
				title: 'Sync',
				id: 'tab-sync',
				icon: 'fas fa-sync-alt',
				//click: "Sync.page_load()",
			},
		])
	},

	top_bar () {
		El.append('body', `
			<div class='top-bar'>
				<div class='right'>
					<div class='fas fa-search'></div>
					<div class='fas fa-users' id='${ Find.replace_all(contacts_btn, '#', '') }'></div>
					<div class='fas fa-bell' id='${ Find.replace_all(notif_btn, '#', '') }'></div>
				</div>
			</div>
		`)
	},

	content () {
		El.append('body', `
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
		El.append('body', `
			<div class='left-box' id='${ Find.replace_all(side_box, '#', '') }'></div>
			<div class='collections' id='${ Find.replace_all(collections_box, '#', '') }'></div>
		`)

		Collections.layout()
	},
	
	account_box () {
		El.append('body', `
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
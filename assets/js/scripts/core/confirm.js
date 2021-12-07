const Confirm = {

	close (run) {
		this.close_modal(run)

		switch (run) {
			case 'delete_model':
				GetModel.get()
				break

			case 'delete_diagram':
				GetDiagram.get()
				break
		}
	},

	text (section) {
		switch (section) {
			case 'delete_model':
			case 'delete_diagram':
			case 'delete_collection':
				return `This action cannot be undone. Confirm delete item ?`
				
			case 'logoff': 
				return 'Are you sure you want to sign out of your account ?'
		}
	},

	task (run, slug = null) {
		this.close_modal(run)

		setTimeout( e => {
			switch (run) {
				case 'logoff':
					Login.logoff()
					break
	
				case 'delete_model':
					GetModel.delete()
					break
	
				case 'delete_diagram':
					GetDiagram.delete()
					break
	
				case 'delete_collection':
					ManagerCollectionPost.delete(slug)
					break
			}
		}, anim_time * 2)
	},

	run (task, slug = null) {
		$(modal).fadeOut()
		$(account_box).hide()
		$(account_avatar).removeClass('logo-actived')

		$(confirm_modal).empty()
		$(confirm_modal).append(`
			<div class='conf-content'>
				<div class='label'>${ this.text(task) }</div>
			</div>

			<div class='conf-footer'>
				<div class='btn' onclick="Confirm.task('${ task }', '${ slug }')">Confirm</div>
				<div class='btn' onclick="Confirm.close('${ task }')">Cancel</div>
			</div>
		`)
		
		$(mask).fadeIn()
		$(confirm_modal).fadeIn()
	},

	close_modal (run = null) {
		if (run == null) {
			Modals.close_all()
		} else {
			if (Find.in_array(run, [ 
				'delete_task', 'delete_model', 'delete_diagram', 
			]) != true) { 
				$(mask).fadeOut() 
			}
		}

		$(confirm_modal).fadeOut()
	},

}
const ISE = {

	loader () {
		this.element()
		this.get_dataset()

		setInterval( e => {
			if (editor && sql_code_ref) { this.toggle_element() }
		}, anim_time)
	},

	element () {
		$(intellisense).remove()
		$(code_view_modal).append(`
			<div class='intellisense' id='${ Find.replace_all(intellisense, code_view_modal + ' > #', '') }'>
				<div class='header'></div>
				<div class='msg' id='isp-msg'></div>
				<div class='get-def'></div>

				<div class='footer'>
					<div class='fas fa-copy' title='Copy definition' onclick="ISE.copy_definition()"></div>
				</div>
			</div>
		`)
	},

	get_dataset () {
		fetch(Apis.npoint('76b01add5383aaa020c7')).then( 
			json => json.json() 
		).then( code => { 
			sql_code_ref = code
		})
	},

	open_docs (page) {
		if (Storage.has('offline-mode') != true) {
			open(
				Find.replace_all(
					page, '{docs_page}', sql_code_ref.docs_page
				)
			)
		} else {
			GUI.message('isp-msg', 'You are offline. Try again later...', 3000)
		}
	},

	get_definition () {
		$(intellisense + ' > .header').text(editor.getSelection())
		$(intellisense + ' > .get-def').append(`
			<div class='define'>${
				sql_code_ref.keywords[
					editor.getSelection().toLowerCase()
				]
			}</div>
		`)
			
		if (sql_code_ref.docs[editor.getSelection().toLowerCase()] != undefined) {
			$(intellisense + ' > .footer > .learn').remove()
			if ($(intellisense + ' > .footer > .learn').length == 0) {
				$(intellisense + ' > .footer').append(`
					<div class='learn' onclick="ISE.open_docs('${ sql_code_ref.docs[editor.getSelection().toLowerCase()] }')">
						Learn more
					</div>
				`)
			}
		} else {
			$(intellisense + ' > .footer > .learn').remove()
		}
	},

	toggle_element () {
		$(intellisense + ' > .header').empty()
		$(intellisense + ' > .get-def').empty()
	
		if (sql_code_ref.keywords != undefined) {
			if (sql_code_ref.keywords[editor.getSelection().toLowerCase()] != undefined) {
				this.get_definition()
				$(intellisense).fadeIn(anim_time)
			} else { 
				$(intellisense).hide()
			}
		}
	},

	copy_definition () {
		GUI.message('isp-msg', 'Copied with successfully.', 3000)
		Misc.copy_element($(intellisense + ' > .get-def')[0].innerText)
	},

}
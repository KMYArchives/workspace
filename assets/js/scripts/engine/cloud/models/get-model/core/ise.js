const ISE = {

	loader () {
		this.element()
		this.get_dataset()

		setInterval( e => {
			if (editor && sql_code_ref) { this.toggle_element() }
		}, anim_time)
	},

	element () {
		El.append(intellisense, `
			<div class='header'></div>
			<div class='msg' id='isp-msg'></div>
			<div class='get-def'></div>

			<div class='footer'>
				<div class='fas fa-copy' title='Copy definition' onclick="ISE.copy_definition()"></div>
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
		El.text(intellisense + ' > .header', editor.getSelection())

		El.append(intellisense + ' > .get-def', `
			<div class='define'>${
				sql_code_ref.keywords[
					editor.getSelection().toLowerCase()
				]
			}</div>
		`)
			
		if (sql_code_ref.docs[editor.getSelection().toLowerCase()] != undefined) {
			El.remove(intellisense + ' > .footer > .learn')

			if (!El.has(intellisense + ' > .footer > .learn')) {
				El.append(intellisense + ' > .footer', `
					<div class='learn' onclick="ISE.open_docs('${ sql_code_ref.docs[editor.getSelection().toLowerCase()] }')">
						Learn more
					</div>
				`)
			}
		} else {
			El.remove(intellisense + ' > .footer > .learn')
		}
	},

	toggle_element () {
		El.empty(
			intellisense + ' > .header',
			intellisense + ' > .get-def',
		)
	
		if (sql_code_ref.keywords != undefined) {
			if (sql_code_ref.keywords[editor.getSelection().toLowerCase()] != undefined) {
				this.get_definition()
				El.show(intellisense)
			} else { 
				El.hide(intellisense)
			}
		}
	},

	copy_definition () {
		GUI.message('isp-msg', 'Copied with successfully.', 3000)

		Misc.copy_element(
			El.text(intellisense + ' > .get-def')
		)
	},

}
const Editor = {

	loader () {
		if (editor == null || editor == undefined) {
			editor = CodeMirror.fromTextArea(
				document.getElementById(cm_editor), {
					tabSize: 2,
					indentSize: 2,
					readOnly: true,
					autofocus: true,
					indentAuto: true,
					theme: 'default',
					lineNumbers: true,
					autoRefresh: true,
					lineWrapping: true,
					matchBrackets: true,
					mode: 'text/x-mysql',
					indentWithTabs: true,
					styleActiveLine: true,
					autoCloseBrackets: true,
					styleActiveSelected: true,
				}
			)

			ISE.loader()
			this.auto_refresh()
		}
	},

	auto_refresh () {
		setInterval( e => { 
			if (editor != null || editor != undefined) { editor.refresh() }
		}, anim_time)
	},

	content (content) {
		if (editor.getDoc().getValue() == '' || editor.getDoc().getValue() != content) {
			editor.getDoc().setValue(content) 
		}
	}

}
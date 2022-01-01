const El = {

	get (el, type = null) {
		switch (type) {
			case 'id':
				return document.getElementById(el)

			case 'class':
				return document.getElementsByClassName(el)

			case 'tag':
				return document.getElementsByTagName(el)

			case 'name':
				return document.getElementsByName(el)

			case 'selector':
				return document.querySelector(el)

			case 'child':
				return document.querySelector(el).childNodes

			case 'selectorAll':
				return document.querySelectorAll(el)

			default:
				return document.querySelector(el)
		}
	},

	show (el) {
		if (Array.isArray(el)) {
			for (let i = 0; i < el.length; i++) {
				El.get(el[i]).style.display = 'block'
			}
		} else {
			El.get(el).style.display = 'block'
		}
	},

	hide (el) {
		if (Array.isArray(el)) {
			for (let i = 0; i < el.length; i++) {
				El.get(el[i]).style.display = 'none'
			}
		} else {
			El.get(el).style.display = 'none'
		}
	},

	html (el) {
		El.get(el).innerHTML
	},

	toggle (el) {
		var status
		var i = setInterval( e => {
			if (status) {
				clearInterval(i)
			} else {
				status = El.get(el).style.display
				El.get(el).style.display = status == 'none' ? 'block' : 'none'
			}
		}, 1)
	},

	append (el, html) {
		El.get(el).innerHTML += html
	},

	prepend (el, html) {
		El.get(el).innerHTML = html + El.get(el).innerHTML
	},

	remove (el) {
		El.get(el).remove()
	},

	getText (el) {
		return El.get(el).innerText
	},

	setText (el, text) {
		El.get(el).innerText = text
	},

	empty (el) {
		if (Array.isArray(el)) {
			for (let i = 0; i < el.length; i++) {
				El.get(el[i]).innerHTML = ''
			}
		} else {
			El.get(el).innerHTML = ''
		}
	},

}
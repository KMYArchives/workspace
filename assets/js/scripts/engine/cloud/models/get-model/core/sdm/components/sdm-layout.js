const SDMLayout = {

	get () {
		El.empty(sdm_get)
		El.append(sdm_get, `
			<div class='header'></div>
			<div class='msg' id='isp-msg'></div>
			<div class='get-def'></div>

			<div class='footer'>
				<div class='list-link' onclick="SDMList.show()">${ SDM.name }</div>
				<div class='fas fa-copy' title='Copy definition' onclick="SDMMisc._copy()"></div>
			</div>
		`)
	},

	list () {
		El.empty(sdm_list)
		El.append(sdm_list, `
			<div class='nav-right'>
				<div class='fas fa-home actived'></div>
				<div class='fas fa-sort-amount-down-alt'></div>
			</div>

			<div class='header'>
				<div class='label'>${ SDM.name }</div>
				<div class='fas fa-times' onclick="SDMList.hide()"></div>
			</div>

			<input class='search-area' type='text' placeholder='Search' onkeyup="SDMList.search()">
			<div class='list' onscroll="SDMList.scroll()"></div>
		`)
	},

	_item (doc) {
		El.append(`${ sdm_list } > .list`, `
			<div class='item' id='${
				doc.slug
			}' onclick="SDMAjax.get('${
				doc.slug
			}')">${
				doc.name
			}</div>
		`)
	},

}
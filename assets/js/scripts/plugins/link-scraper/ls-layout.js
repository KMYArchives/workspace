const LSLayout = {

	layout () {
		El.empty(link_scraper)
		El.append(link_scraper, `
			<div class='lk-header'>
				<img class='lk-preview' src='https://s0.wp.com/mshots/v1/https://www.google.com?w=640&h=480'>

				<div class='lk-title'>
					<img class='lk-favicon' src='https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&url=https://www.google.com&size=32'>
					<div class='lk-site'>Google</div>
				</div>
			</div>
		`)
	},

}
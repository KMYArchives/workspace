const GetDiagramModal = {

	layout () {
		if (El.is_empty(diagram_modal)) {
			El.append(diagram_modal, `
				<div class='title' id='${ Find.replace(header_dgr, diagram_modal + ' > #', '') }'>
					<div class='label'></div>
					<div class='fas fa-times' onclick='Modals.close_all()'></div>
					<div class='fas fa-trash-alt' onclick="Confirm.run('delete_diagram')" title='Delete diagram'></div>
					<div class='far fa-heart' onclick='FavDiagrams.execute()'></div>
				</div>

				<div class='bar' id='${ Find.replace(toolbar_dgr, diagram_modal + ' > #', '') }'>
					<div class='item bdr-rig' onclick='ShareDiagram.toggle(this)'>Share</div>

					<div class='right'>
						<div class='item icon' id='download-diagram' onclick='GetDiagram.download()' title='Download'>
							<div class='fas fa-download'></div>
						</div>

						<div class='item icon no-bdr-rig' id='get-options-diagram' onclick='OptionsDiagram.toggle()' title="Option's">
							<div class='fas fa-cog'></div>
						</div>
					</div>

					<div class='message' id='${ Find.replace(message_dgr, toolbar_dgr + ' > #', '') }'></div>
				</div>

				<div class='share-box' id='${ Find.replace(share_dgr_box, diagram_modal + ' > #', '') }'></div>
				<div class='options-box' id='${ Find.replace(options_dgr, diagram_modal + ' > #', '') }'></div>

				<div class='viewer'>
					<img>
				</div>
			`)
		}
	},

}
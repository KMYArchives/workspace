var editor, 
	menu_items, 
	mark_lines, 
	sql_code_ref

var mask = '.mask',
	modal = '.modal',
	confirm_modal = '#confirm-mdl',
	diagram_modal = '#diagram-mdl',
	code_view_modal = '#code-view-mdl',
	collection_modal = '#collection-mdl'

var hide = 'hide',
	anim_time = 200,
	act_class = 'actived',
	side_box = '#side-box',
	cm_editor = 'cm-editor',
	props_btn = '#props-btn',
	notif_btn = '#notif-btn',
	notif_box = '#notif-box',
	sub_header = '.sub-header',
	menu_top_item = '.top-menu',
	account_box = '#account-box',
	select_list = '#select-list',
	total_items = '#total-items',
	contacts_box = '#contacts-box',
	contacts_btn = '#contacts-btn',
	profile_name = '#profile-name',
	props_btn_dgr = '#props-btn-dgr',
	user_container = '#user-content',
	user_page_top = '#user-page-top',
	account_avatar = '#account-avatar',
	collections_box = '#collections-box',
	sub_header_items = sub_header + ' > .menu > .item'

// Diagram modal
var message_dgr = toolbar_dgr + ' > #cvm-message',
	toolbar_dgr = diagram_modal + ' > #toolbar-dgr',
	header_dgr = diagram_modal + ' > #header-dgr-view',
	share_dgr_box = diagram_modal + ' > #share-dgr-box',
	options_dgr = diagram_modal + ' > #get-options-dgr',
	properties_dgr = diagram_modal + ' > #properties-dgr'

// Code view modal
var visual_mode = code_view_modal + ' > #visual-mode',
	send_to_box = code_view_modal + ' > #send-to-box',
	toolbar_code = code_view_modal + ' > #toolbar-snp',
	properties = code_view_modal + ' > #properties-snp',
	intellisense = code_view_modal + ' > #intellisense',
	code_diagram = code_view_modal + ' > #code-diagram',
	table_render_visual = visual_mode + ' > #tbl-render',
	code_view_message = toolbar_code + ' > #cvm-message',
	status_code = code_view_modal + ' > #status-code-bar',
	header_code = code_view_modal + ' > #header-code-view',
	share_code_box = code_view_modal + ' > #share-code-box',
	options_model = code_view_modal + ' > #get-options-model',
	models_linked_box = code_view_modal + ' > #models-linked-box'
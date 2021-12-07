<?php

	switch ($urlE[3]) {
		case 'get':
			Request::get([ 'slug', 'username' ]);
			$share->get();
			break;

		case 'list':
			Request::get([ 'username' ]);
			Request::protect([ 'offset' ]);
			$share->list();
			break;

		case 'create':
			Request::protect([ 'note' ]);
			Request::post([ 'db', 'tbl', 'name', 'type', 'contact', 'content', 'username' ]);
			$share->create();
			break;

		case 'update':
			Request::post([ 'slug', 'status', 'username' ]);
			$share->update();
			break;
			
		default:
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
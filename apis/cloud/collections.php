<?php

	switch ($urlE[3]) {
		case 'get':
			Request::get([ 'slug' ]);
			Request::protect([ 'username' ]);
			$collections->get();
			break;
			
		case 'list':
			Request::protect([ 'term', 'offset', 'username' ]);
			$collections->list();
			break;

		case 'edit':
			Request::post([ 'slug', 'name', 'privacy' ]);
			$collections->edit();
			break;

		case 'delete':
			Request::post([ 'slug' ]);
			$collections->delete();
			break;

		case 'create':
			Request::post([ 'name', 'privacy' ]);
			$collections->create();
			break;
			
		default:
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
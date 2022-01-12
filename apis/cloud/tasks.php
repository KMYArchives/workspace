<?php

	switch ($urlE[3]) {
		case 'get':
			Request::get([ 'slug' ]);
			Request::protect([ 'username' ]);
			$tasks->get();
			break;

		case 'list':
			Request::protect([ 'term', 'offset', 'filter', 'favorited', 'username' ]);
			$tasks->list();
			break;

		case 'delete':
			Request::post([ 'slug' ]);
			$tasks->delete();
			break;

		case 'create':
			Request::post([ 'name', 'interval', 'content', 'username' ]);
			$diagrams->create();
			break;
			
		default:
			Headers::setHttpCode(404);
			Headers::setContentType('application/json');
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
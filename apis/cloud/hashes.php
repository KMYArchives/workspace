<?php

	switch ($urlE[3]) {
		case 'get':
			Request::get([ 'slug' ]);
			Request::protect([ 'username' ]);
			$hashes->get();
			break;

		case 'meta':
			include_once 'meta/hashes-meta.php';
			break;

		case 'list':
			Request::protect([ 'col', 'term', 'offset', 'filter', 'username' ]);
			$hashes->list();
			break;

		case 'create':
			Request::post([ 'name', 'size', 'type', 'content', 'username' ]);
			$hashes->create();
			break;
			
		default:
			Headers::setHttpCode(404);
			Headers::setContentType('application/json');
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
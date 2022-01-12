<?php

	switch ($urlE[4]) {
		case 'get':
			Request::get([ 'slug' ]);
			$sql_minidoc->get();
			break;

		case 'list':
			Request::protect([ 'term', 'order', 'offset' ]);
			$sql_minidoc->list();
			break;
			
		default:
			Headers::setHttpCode(404);
			Headers::setContentType('application/json');
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
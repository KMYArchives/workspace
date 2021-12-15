<?php

	switch ($urlE[2]) {
		case 'get':
			Request::get([ 'slug' ]);
			$notifications->get();
			break;

		case 'list':
			Request::protect([ 'term', 'filter' ]);
			$notifications->list();
			break;

		case 'update':
			Request::post([ 'slug', 'status' ]);
			$notifications->update();
			break;
		
		default:
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
<?php

	switch ($urlE[3]) {
		case 'get':
			Request::get([ 'slug' ]);
			$history->get();
			break;

		case 'list':
			Request::protect([ 'term', 'offset', 'filter', 'favorited', 'username' ]);
			$history->list();
			break;

		case 'delete':
			Request::post([ 'slug' ]);
			$history->delete();
			break;

		case 'create':
			Request::post([ 'name', 'size', 'mime', 'extension', 'content', 'username' ]);
			$tables_models->create();
			break;

		case 'favorite':
			Request::post([ 'slug' ]);
			$history->favorite();
			break;
			
		default:
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
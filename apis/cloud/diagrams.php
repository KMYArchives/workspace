<?php

	switch ($urlE[3]) {
		case 'get':
			Request::get([ 'slug' ]);
			Request::protect([ 'username' ]);
			$diagrams->get();
			break;

		case 'meta':
			include_once 'meta/diagrams-meta.php';
			break;

		case 'list':
			Request::protect([ 'term', 'offset', 'filter', 'favorited', 'username' ]);
			$diagrams->list();
			break;

		case 'delete':
			Request::post([ 'slug' ]);
			$diagrams->delete();
			break;

		case 'create':
			Request::protect([ 'model', 'username' ]);
			Request::post([ 'name', 'image' ]);
			$diagrams->create();
			break;
			
		default:
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
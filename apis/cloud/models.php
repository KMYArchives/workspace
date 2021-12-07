<?php

	switch ($urlE[3]) {
		case 'get':
			Request::get([ 'slug' ]);
			Request::protect([ 'username' ]);
			$models->get();
			break;

		case 'meta':
			include_once 'meta/models-meta.php';
			break;

		case 'list':
			Request::protect([ 'col', 'slug', 'offset', 'filter', 'username' ]);
			$models->list();
			break;

		case 'delete':
			Request::post([ 'slug' ]);
			$models->delete();
			break;

		case 'create':
			Request::protect([ 'comment' ]);
			Request::post([ 'name', 'temporary', 'sql_content', 'json_content', 'engine', 'collation', 'row_format', 'auto_increment', 'username' ]);
			$models->create();
			break;
			
		default:
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
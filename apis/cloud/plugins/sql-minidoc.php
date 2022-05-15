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
			Cabllack::json(404, [
				'error' => 'Argument invalid...'
			]);
			break;
	}
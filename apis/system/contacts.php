<?php

	switch ($urlE[2]) {
		case 'get':
			Request::get([ 'slug' ]);
			$contacts->get();
			break;

		case 'list':
			Request::protect([ 'filter', 'offset', 'username' ]);
			$contacts->list();
			break;

		case 'delete':
			Request::protect([ 'username' ]);
			Request::post([ 'slug' ]);
			$contacts->delete();
			break;

		case 'create':
			Request::protect([ 'username' ]);
			Request::post([ 'email' ]);
			$contacts->create();
			break;

		case 'update':
			Request::protect([ 'username' ]);
			Request::post([ 'slug', 'status' ]);
			$contacts->update();
			break;

		case 'favorite':
			Request::post([ 'slug' ]);
			$contacts->favorite();
			break;
			
		default:
			Cabllack::json(404, [
				'error' => 'Argument invalid...'
			]);
			break;
	}
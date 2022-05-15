<?php

	switch ($urlE[2]) {
		case 'get':
			Request::get([ 'slug' ]);
			$notifications->get();
			break;

		case 'list':
			Request::protect([ 'filter' ]);
			$notifications->list();
			break;

		case 'delete':
			Request::post([ 'slug' ]);
			$notifications->delete();
			break;

		case 'update':
			Request::post([ 'slug', 'status' ]);
			$notifications->update();
			break;
		
		default:
			Cabllack::json(404, [
				'error' => 'Argument invalid...'
			]);
			break;
	}
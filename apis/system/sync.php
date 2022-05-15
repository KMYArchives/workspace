<?php

	switch ($urlE[2]) {
		case 'get':
			Request::get([ 'slug', 'username' ]);
			$sync->get();
			break;

		case 'delete':
			Request::post([ 'slug' ]);
			$sync->delete();
			break;

		case 'create':
			Request::post([ 'prod_id', 'file', 'username' ]);
			$sync->create();
			break;
		
		default:
			Cabllack::json(404, [
				'error' => 'Argument invalid...'
			]);
			break;
	}
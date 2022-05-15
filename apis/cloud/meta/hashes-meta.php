<?php

	switch ($urlE[4]) {
		case 'delete':
			Request::post([ 'slug' ]);
			$hashes_meta->delete();
			break;

		case 'favorite':
			Request::post([ 'slug' ]);
			$hashes_meta->favorite();
			break;

		case 'change-privacy':
			Request::post([ 'slug' ]);
			$hashes_meta->change_privacy();
			break;

		case 'change-collection':
			Request::post([ 'slug', 'col' ]);
			$hashes_meta->change_collection();
			break;
		
		default:
			Cabllack::json(404, [
				'error' => 'Argument invalid...'
			]);
			break;
	}
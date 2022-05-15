<?php

	switch ($urlE[3]) {
		case 'delete':
			Request::post([ 'slug' ]);
			$models_linked->delete();
			break;

		case 'create':
			Request::post([ 'slug', 'linked' ]);
			$models_linked->create();
			break;
		
		default:
			Cabllack::json(404, [
				'error' => 'Argument invalid...'
			]);
			break;
	}
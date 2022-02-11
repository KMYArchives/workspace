<?php

	switch ($urlE[4]) {
		case 'download':
			Request::get([ 'slug' ]);
			$models_meta->download();
			break;

		case 'favorite':
			Request::post([ 'slug' ]);
			$models_meta->favorite();
			break;

		case 'get-options':
			Request::get([ 'slug' ]);
			Request::protect([ 'username' ]);
			$models_meta->get_options();
			break;

		case 'change-privacy':
			Request::post([ 'slug' ]);
			$models_meta->change_privacy();
			break;

		case 'change-collection':
			Request::post([ 'slug', 'col' ]);
			$models_meta->change_collection();
			break;
			
		default:
			Headers::setHttpCode(404);
			Headers::setContentType('application/json');
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
<?php

	switch ($urlE[4]) {
		case 'favorite':
			Request::post([ 'slug' ]);
			$diagrams_meta->favorite();
			break;

		case 'get-options':
			Request::get([ 'slug' ]);
			Request::protect([ 'username' ]);
			$diagrams_meta->get_options();
			break;

		case 'change-privacy':
			Request::post([ 'slug' ]);
			$diagrams_meta->change_privacy();
			break;

		case 'change-collection':
			Request::post([ 'slug', 'col' ]);
			$diagrams_meta->change_collection();
			break;
			
		default:
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
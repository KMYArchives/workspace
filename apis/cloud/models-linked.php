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
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
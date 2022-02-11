<?php

	switch ($urlE[2]) {
		case 'basic':
			$core->basic();
			break;

		case 'json_read':
			Request::get([ 'file' ]);
			$core->json_read();
			break;
		
		default:
			Headers::setHttpCode(404);
			Headers::setContentType('application/json');
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
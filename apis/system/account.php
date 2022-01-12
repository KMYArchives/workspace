<?php

	switch ($urlE[2]) {
		case 'stats':
			$stats->details();
			break;

		case 'details':
			$clients->details();
			break;
		
		default:
			Headers::setHttpCode(404);
			Headers::setContentType('application/json');
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
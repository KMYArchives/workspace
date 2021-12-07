<?php

	switch ($urlE[2]) {
		case 'stats':
			$stats->details();
			break;

		case 'details':
			$clients->details();
			break;
		
		default:
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
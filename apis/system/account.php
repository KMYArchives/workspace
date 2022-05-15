<?php

	switch ($urlE[2]) {
		case 'stats':
			$stats->details();
			break;

		case 'details':
			$clients->details();
			break;
		
		default:
			Cabllack::json(404, [
				'error' => 'Argument invalid...'
			]);
			break;
	}
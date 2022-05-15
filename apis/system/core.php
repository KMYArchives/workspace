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
			Cabllack::json(404, [
				'error' => 'Argument invalid...'
			]);
			break;
	}
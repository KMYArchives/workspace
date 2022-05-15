<?php

	switch ($urlE[2]) {
		case 'logoff':
			$login->sign_out();
			break;

		case 'check-logged':
			$login->check_logged();
			break;
		
		default:
			Cabllack::json(404, [
				'error' => 'Argument invalid...'
			]);
			break;
	}
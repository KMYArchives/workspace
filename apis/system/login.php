<?php

	switch ($urlE[2]) {
		case 'logoff':
			$login->sign_out();
			break;

		case 'check-logged':
			$login->check_logged();
			break;
		
		default:
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
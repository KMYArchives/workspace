<?php

	switch ($urlE[1]) {
		case 'sync':
			include_once 'system/sync.php';
			break;

		case 'cloud':
			include_once 'cloud/cloud.php';
			break;

		case 'login':
			include_once 'system/login.php';
			break;

		case 'account':
			include_once 'system/account.php';
			break;

		case 'contacts':
			include_once 'system/contacts.php';
			break;

		case 'notifications':
			include_once 'system/notifications.php';
			break;
		
		default:
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
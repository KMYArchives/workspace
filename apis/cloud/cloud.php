<?php

	switch ($urlE[2]) {
		case 'tasks':
			include_once 'tasks.php';
			break;

		case 'share':
			include_once 'share.php';
			break;

		case 'models':
			include_once 'models.php';
			break;

		case 'hashes':
			include_once 'hashes.php';
			break;

		case 'plugins':
			include_once 'plugins.php';
			break;

		case 'history':
			include_once 'history.php';
			break;

		case 'diagrams':
			include_once 'diagrams.php';
			break;

		case 'collections':
			include_once 'collections.php';
			break;

		case 'models-linked':
			include_once 'models-linked.php';
			break;
		
		default:
			Cabllack::json(404, [
				'error' => 'Argument invalid...'
			]);
			break;
	}
<?php

	switch ($urlE[3]) {
		case 'scraper':
			$scraper->execute();
			break;

		case 'sql-minidoc':
			include_once 'plugins/sql-minidoc.php';
			break;

		case 'table-schema':
			include_once 'plugins/table-schema.php';
			break;

		case 'code-convert':
			include_once 'plugins/code-convert.php';
			break;
		
		default:
			Callback::json(404, [ 'error' => 'Argument invalid...' ]);
			break;
	}
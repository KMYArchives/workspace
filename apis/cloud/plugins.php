<?php

	switch ($urlE[3]) {
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
			Headers::setHttpCode(404);
			Headers::setContentType('application/json');
			echo json_encode([ 'error' => 'Argument invalid...' ]);
			break;
	}
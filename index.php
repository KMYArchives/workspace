<?php

	require_once 'assets/php/autoload.php';

	Headers::core();
	Utils::show_errors('none');
	Request::protect([ 'url', 'i' ]);
	$urlE   =   explode('/', $_GET['url']);

	if (in_array($urlE[0], [
		null, 'tasks', 'models', 'hashes', 'history', 'diagrams', 'contacts'
	])) {
		include_once Values::$assets['pages'] . 'page.php';
	} else if (in_array($urlE[0], [ 'raw', 'yuki', 'apis' ])) {
		if ($urlE[0] == 'apis') {
			include_once 'apis/apis.php';
		} else {
			include_once $urlE[0] . '.php';
		}
	} else {
		echo json_encode([ 'error' => '404: page not found.' ]);
	}
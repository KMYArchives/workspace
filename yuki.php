<?php

	switch ($urlE[1]) {
		case 'js':
			$yuki->js('index');
			break;
			
		case 'css':
			$yuki->css('index');
			break;

		default:
			header('Location:' . Values::$assets['link']);
			break;
	}
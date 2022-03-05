<?php

	switch ($urlE[1]) {
		case 'js':
			$yuki->js('index');
			break;
			
		case 'css':
			$yuki->css('index');
			break;

		case 'json':
			$yuki->json($urlE[2]);
			break;

		case 'image':
			$yuki->image($urlE[2]);
			break;

		default:
			header('Location:' . Values::$assets['link']);
			break;
	}
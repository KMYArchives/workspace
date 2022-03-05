<?php

	require_once 'vendor/autoload.php';
	require_once 'assets/php/yuki/autoload.php';

	foreach ([ 
		'core/',
		'page/',
		'utils/',
		'cloud/',
		'system/',
		'account/', 
		'security/',
		'cloud/meta/',
		'cloud/plugins/',
	] as $p) {
		foreach (scandir(__DIR__ . '/' . $p) as $file) {
			if (!in_array(
				substr($file, 0, 1), [ '_' ]
			) && is_file(
				__DIR__ . '/' . $p . $file
			)) {
				if (pathinfo(
					$file, PATHINFO_EXTENSION
				) == 'php') {
					require_once $p . $file;
				}
			}
		}
	}

	// System
	$core			=	new Core;

	// Account
	$login			=	new Login;
	$stats			=	new Stats;
	$clients		=	new Clients;
	$contacts		=	new Contacts;
	$notifications	=	new Notifications;
	
	// Cloud
	$sync			=	new Sync;
	$tasks			=	new Tasks;
	$hashes			=	new Hashes;
	$models			=	new Models;
	$history		=	new History;
	$diagrams		=	new Diagrams;
	$collections	=	new Collections;
	$models_linked	=	new ModelsLinked;

	// Meta
	$tasks_meta		=	new TasksMeta;
	$models_meta	=	new ModelsMeta;
	$hashes_meta	=	new HashesMeta;
	$diagrams_meta	=	new DiagramsMeta;

	// Plugins
	$scraper		=	new Scraper;
	$sql_minidoc	=	new SqlMiniDoc;
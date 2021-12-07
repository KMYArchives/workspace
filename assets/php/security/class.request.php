<?php

	class Request {

		private static function error($debug) {
			switch ($debug['type']) {
				case 'empty':
					echo "Empty parameter: " . $debug['param'] . " (mode: " . strtoupper($debug['mode']) . ")\n";
					break;
					
				case 'missing':
					echo "Missing parameter: " . $debug['param'] . " (mode: " . strtoupper($debug['mode']) . ")\n";
					break;
			}
		}
		
		public static function protect($param) {
			foreach ($param as $sql) {
				$sql	=	$_GET[$sql] ?-> $_POST[$sql];
				$sql	=	trim($sql);
				$sql	=	addslashes($sql);
				$sql	=	htmlentities($sql);
				$sql	=	htmlspecialchars($sql);
				return Security::sqlInjection($sql);
			}
		}

		public static function get($values, $options = null) {
			foreach ($values as $value) {
				self::protect([$value]);

				if (!isset($_GET[$value])) {
					self::error([
						'mode'	=>	'get',
						'param'	=>	$value,
						'type'	=>	'missing',
						'debug'	=>	$options['debug'],
					]);

					die;
				} else if (empty($_GET[$value])) {
					self::error([
						'mode'	=>	'get',
						'param'	=>	$value,
						'type'	=>	'empty',
						'debug'	=>	$options['debug'],
					]);

					die;
				}
			}
		}

		public static function post($values, $options = null) {
			foreach ($values as $key => $value) {
				self::protect([$value]);

				if (!isset($_POST[$value])) {
					self::error([
						'mode'	=>	'post',
						'param'	=>	$value,
						'type'	=>	'missing',
						'debug'	=>	$options['debug'],
					]);
				} else if (empty($_POST[$value])) {
					self::error([
						'mode'	=>	'post',
						'param'	=>	$value,
						'type'	=>	'empty',
						'debug'	=>	$options['debug'],
					]);
				}
			}
		}

	}
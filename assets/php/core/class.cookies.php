<?php

	class Cookies {

		public static function has($name) {
			if ($_COOKIE[Values::$cookie[$name]]) {
				return true;
			} else {
				return false;
			}
		}

		public static function delete($name) { 
			setcookie(
				Values::$cookie[$name], null, null, '/', null, true, true
			); 
		}

		public static function create($options) { 
			setcookie(
				Values::$cookie[$options[0]], $options[1], $options[2], '/', null, true, true
			); 
		}

		public static function get($name) { return $_COOKIE[Values::$cookie[$name]]; }

	}
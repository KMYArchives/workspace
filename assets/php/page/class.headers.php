<?php

	class Headers {

		public static function core() {
			self::set('X-Frame-Options', 'deny');
			self::set('X-XSS-Protection', '1; mode=block');
			self::set('X-Content-Type-Options', 'nosniff');
			self::set('Cache-Control', 'private; max-age=86400');
			self::set('ETag', '"' . Values::$basic['etag'] . '"');
			self::set('Strict-Transport-Security', 'max-age=86400');
			self::set('Access-Control-Allow-Origin', Values::$assets['link']);
		}

		public static function setLocation($url) { self::set('Location', $url); }
		
		public static function setHttpCode($code) { self::set('HTTP/1.1', $code); }

		public static function set($type, $value) { header($type . ': ' . $value); }

		public static function setContentType($type) { self::set('Content-Type', $type); }

		public static function setContentLength($length) { self::set('Content-Length', $length); }

	}
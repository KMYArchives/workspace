<?php

	class IP {

		static $apis	=	[
			'method3'	=>	'https://api.ipify.org',
			'method1'	=>	'http://free.ipwhois.io/json/{ip}',
			'params'	=>	'country,region,regionName,city,zip,lat,lon,timezone',
			'method2'	=>	'http://ip-api.com/json/{ip}?fields=country,region,regionName,city,zip,lat,lon,timezone',
		];

		private static function domain($url) {
			return explode(
				'/', preg_replace(
					"(^https?://)", '', $url
				)
			)[0];
		}

		private static function api($ip, $method) {
			return str_replace(
				'{ip}', Clean::default($ip), self::$apis[$method]
			);
		}

		public static function only_ip() {
			return File::read(self::api(null, 'method3'), [
				'remote'	=>	true,
			]);
		}

		public static function encode($ip) {
			return OpenSSL::encrypt(
				self::plain($ip)
			);
		}

		public static function reverse($domain) { 
			return gethostbyname(
				self::domain($domain)
			);
		}

		public static function decode($ip, $json = false) {
			return File::read(
				self::api(
					OpenSSL::decrypt($ip), 'method1'
				), [
					'remote'		=>	true,
					'json_decode'	=>	$json,
				]
			);
		}

		public static function plain($ip, $method = 'method1') {
			return File::read(self::api($ip, $method), [
				'remote'	=>	true
			]);
		}

		public static function location($ip, $method = 'method1') { return self::plain($ip, $method); }

	}
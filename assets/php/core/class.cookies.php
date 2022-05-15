<?php

	class Cookies {

		private static $_patterns 	=	[
			'int'					=>	'/[^0-9]/',
			'ip'					=>	'/[^0-9.]/',
			'string'				=>	'/[^a-zA-Z]/',
			'hash'					=>	'/[^a-f0-9]/',
			'hex'					=>	'/[^a-f0-9]/',
			'color'					=>	'/[^a-f0-9#]/',
			'string_int'			=>	'/[^a-zA-Z0-9]/',
			'default'				=>	'/[^a-zA-Z0-9]/',
			'md5_hash'				=>	'/[^a-f0-9]{32}/',
			'sha1_hash'				=>	'/[^a-f0-9]{40}/',
			'sha256_hash'			=>	'/[^a-f0-9]{64}/',
			'sha384_hash'			=>	'/[^a-f0-9]{96}/',
			'boolean'				=>	'/[^true|false]/',
			'sha512_hash'			=>	'/[^a-f0-9]{128}/',
			'string_slug'			=>	'/[^a-zA-Z0-9-_]/',
			'hashtag'				=>	'/[^a-zA-Z0-9_#]/',
			'base64'				=>	'/[^a-zA-Z0-9+\/]/',
			'phone'					=>	'/[^0-9\+\-\(\) ]/',
			'email'					=>	'/[^a-zA-Z0-9@._-]/',
			'string_url'			=>	'/[^a-zA-Z0-9-_\/]/',
			'string_url_slug'		=>	'/[^a-zA-Z0-9-_\/]/',
			'url'					=>	'/[^a-zA-Z0-9-_:/?#=&;]/',
			'json-array'			=>	'/[^a-zA-Z0-9\{\}\[\]\:\,]/',
			'html'					=>	'/[^a-zA-Z0-9<>\/\#\[\]\{\}]/',
			'json'					=>	'/[^a-zA-Z0-9\{\}\[\]\:\,\s]/',
		];

		private static function _name(string $name): string {
			if (System::global('cookie_' . $name)) {
				return System::global('cookie_' . $name);
			} else {
				return $name;
			}
		}

		public static function has(string $name): bool {
			return isset(
				$_COOKIE[
					self::_name($name)
				]
			);
		}

		public static function create(array $data): void {
			if ($data['opt-pattern']) {
				$data['value']	=	preg_replace(
					self::$_patterns[
						$data['opt-pattern']
					], '', $data['value']
				);
			}

			setcookie(self::_name($data['name']), $data['value'], [
				'expires' 	=>	$data['expires'] ?? 0,
				'path' 		=>	$data['path'] ?? '/',
				'domain' 	=>	$data['domain'] ?? '',
				'secure' 	=>	$data['secure'] ?? false,
				'httpOnly' 	=>	$data['httpOnly'] ?? false,
				'sameSite' 	=>	$data['sameSite'] ?? 'None',
			]);
		}

		public static function get(string $name): string {
			return $_COOKIE[
				self::_name($name)
			];
		}

		public static function delete(string $name): void {
			self::create([
				'value'		=>	null,
				'expire'	=>	time() - 3600,
				'name'		=>	self::_name($name),
			]);
		}

	}
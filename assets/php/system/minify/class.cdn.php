<?php

	class CDN {

		private static $cdn_js_url = "https://cdnjs.cloudflare.com/ajax/libs/{_lib_name_}/{_lib_version_}/{_file_name_}.{_file_type_}";

		private static function _create_cdn_url(array $params) {
			return str_replace([
				'{_lib_name_}', 
				'{_lib_version_}', 
				'{_file_name_}', 
				'{_file_type_}'
			], [
				$params['name'], 
				$params['version'], 
				$params['file'], 
				$params['type']
			], self::$cdn_js_url);
		}

		protected static function _loader(array $libs, string $type = 'js') {
			$list_libs	=	[];

			foreach ($libs as $lib) {
				foreach ($lib['files'] as $file) {
					if ($lib['minify']) {
						$file	=	$file . '.min';
					}

					$list_libs[]	.=	self::_create_cdn_url([
						'file'		=>	$file,
						'type'		=>	$type,
						'name'		=>	$lib['name'],
						'version'	=>	$lib['version']
					]);
				}
			}

			return $list_libs;
		}

	}
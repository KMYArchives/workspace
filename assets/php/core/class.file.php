<?php

	class File {

		private static function _del_file(string $path): void {
			if (file_exists($path)) {
				unlink($path);
			} else {
				throw new \InvalidArgumentException('File not found');
			}
		}

		public static function delete(string|array $file): bool {
			if (array($file)) {
				foreach ($file as $f) {
					self::_del_file($f);
				}
			} else {
				self::_del_file($file);
			}
		}

		public static function file_exists($file) {
			if (file_exists($file)) { return true; }
			return false;
		}
		
		public static function download($options) {
			if (self::file_exists($options['path'] . $options['file'])) {
				header('Content-Description: File Transfer');
				header('Content-Type: application/octet-stream');
				header('Content-Disposition: attachment; filename="' . basename($options['name']) . '"');
				header('Expires: 0');
				header('Cache-Control: must-revalidate');
				header('Pragma: public');
				header('Content-Length: ' . filesize($options['path'] . $options['file']));
				flush();
				readfile($options['path'] . $options['file']);
				exit;
			} else {
				throw new \InvalidArgumentException('File not found');
			}
		}

		public static function read($file, $options = []) {
			if ($options['remote'] == false || $options['remote'] == null) {
				if (file_exists($file)) {
					$content	=	file_get_contents($file);
					if ($options['crypto'] == true) { $content = OpenSSL::decrypt($content); }
					if ($options['json_decode'] == true) { $content = json_decode($content, $options['force_decode']); }
					if ($options['json_encode'] == true) { $content = json_encode($content); }
	
					return $content;
				} else {
					throw new \InvalidArgumentException('File not found');
				}
			} else {
				$content	=	file_get_contents($file);
				if ($options['json_decode'] == true) { $content = json_decode($content, $options['force_decode']); }
				if ($options['json_encode'] == true) { $content = json_encode($content); }

				return $content;
			}
		}

		public static function create($file, $content, $options = []) {
			if ($options['hex_decode'] == true) { 
				$content	=	hex2bin(
					Clean::string(
						$content, 'Az09'
					)
				);
			}

			if ($options['json_decode'] == true) { $content = json_decode($content); }
			if ($options['json_encode'] == true) { $content = json_encode($content, $options['flags']); }
			if ($options['crypto'] == true) { $content = OpenSSL::encrypt($content); }
			if ($options['base64'] == true) { $content = file_get_contents($content); }

			if (file_put_contents($file, $content)) {
				return true;
			} else {
				throw new \InvalidArgumentException('File not created');
			}
		}

	}
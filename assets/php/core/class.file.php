<?php

	class File {

		public static function delete($file) {
			if (file_exists($file)) {
				if (unlink($file)) {
					return true;
				} else {
					throw new \InvalidArgumentException('File not deleted');
				}
			} else {
				throw new \InvalidArgumentException('File not found');
			}
		}

		public static function extension($file) {
			return end(
				explode('.', $file)
			);
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

		public static function bytes($input, $filesize = false) {
			$input	=	Clean::numbers($input);
			if ($filesize == true) { $input = filesize($input); }
			
			return sprintf(
				'%.02F', $input / pow(
					1024, floor( log($input) / log(1024) )
				)
			) * 1 . ' ' . [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ][
				floor(
					log($input) / log(1024)
				)
			];
		}

		public static function upload($input, $target, $options = []) {
			if (in_array($_FILES[$from]['type'], $options['ext'])) {
				if ($_FILES[$from]['size'] <= $options['max_size']) {
					if (copy($_FILES[$from]['tmp_name'], $target)) {
						return true;
					} else {
						throw new \InvalidArgumentException('File not uploaded');
					}
				} else {
					throw new \InvalidArgumentException('The file size is bigger than allowed');
				}
			} else {
				throw new \InvalidArgumentException('File not supported');
			}
		}

		public static function create($file, $content, $options = []) {
			if ($options['hex_decode'] == true) { 
				$content	=	hex2bin(
					Clean::string($content, 'Az09')
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

		public static function hashes($filename, $algos = [], $save_hashes = null) {
			if (!is_string($filename)) { throw new \InvalidArgumentException('Second argument must be a string'); }
			if (!file_exists($filename)) { throw new \InvalidArgumentException('Second argument, file not found'); }
			
			if ($algos != 'all') {
				if (!is_array($algos)) { throw new \InvalidArgumentException('First argument must be an array'); }
			} else {
				$algos = hash_algos();
			}
		
			$result = [];
			$fp = fopen($filename, "r");

			if ($fp) {
				foreach ($algos as $algo) { $ctx[$algo] = hash_init($algo); }
		
				while (!feof($fp)) {
					$buffer = fgets($fp, 65536);
					foreach ($ctx as $key => $context) { hash_update($ctx[$key], $buffer); }
				}
		
				foreach ($algos as $algo) { $result[$algo] = hash_final($ctx[$algo]); }
				fclose($fp);

				if ($save_hashes != null) { 
					file_put_contents(
						$save_hashes . '.json', json_encode(
							$result, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
						)
					); 
				}
			} else {
				throw new \InvalidArgumentException('Could not open file for reading');
			} 

			return $result;
		}

	}
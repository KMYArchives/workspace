<?php

	class FileProperties {

		public static function size($file) {
			if (file_exists($file)) {
				$input = filesize($file);
			
				return sprintf(
					'%.02F', $input / pow(
						1024, floor(
							log($input) / log(1024)
						)
					)
				) * 1 . ' ' . [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ][
					floor(
						log($input) / log(1024)
					)
				];
			}
		}

		public static function mime($file) {
			if (file_exists($file)) {
				return mime_content_type($file);
			}
		}

		public static function extension($file) {
			if (file_exists($file)) {
				return end(
					explode(
						'.', $file
					)
				);
			}
		}

		public static function hashes($filename, $algos = []) {
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
			} else {
				throw new \InvalidArgumentException('Could not open file for reading');
			} 

			return $result;
		}

	}
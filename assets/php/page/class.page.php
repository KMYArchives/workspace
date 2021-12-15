<?php

	class Page {

		public static function css(array $files = []) {
			echo "<link rel='stylesheet' crossorigin='anonymous' href='" . Values::$assets['link'] . Values::$assets['render'] . "css'>";
			
			if ($files) {
				foreach ($files as $file) {
					echo "<link rel='stylesheet' crossorigin='anonymous' href='$file'>";
				}
			}
		}

		public static function js(array $files = [], bool $head = false) {
			if (!$head) {
				echo "<script async defer src='" . Values::$assets['link'] . Values::$assets['render'] . "js'></script>";
			}
			
			if ($files) {
				foreach ($files as $file) {
					echo "<script async defer src='$file'></script>";
				}
			}
		}

	}
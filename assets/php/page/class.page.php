<?php

	class Page {

		public static function tags() {
			echo "<meta name='robots' content='all'>";
			echo "<meta charset='" . Values::$basic['charset'] . "'>";
			echo "<meta http-equiv='X-UA-Compatible' content='ie=edge'>";
			echo "<meta name='viewport' content='width=device-width, initial-scale=1'>";
			echo "<meta name='description' content='" . Values::$basic['title'] . "'>";
			echo "<meta http-equiv='content-language' content='" . Values::$basic['def_lang'] . "'>";
			echo "<link rel='shortcut icon' href='" . Values::$images['favicon'] . "' type='image/x-icon'>";
			echo "<link rel='stylesheet' href='" . Values::$assets['link'] . Values::$assets['render'] . "css'>";
		}
		
		public static function title() { echo Values::$basic['name']; }

	}
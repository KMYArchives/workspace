<?php

	class MetaTagsSocial {

		public static function twitter_card(string $card = 'summary') {
			echo "<meta name='twitter:card' content='$card'>";
		}

		public static function twitter_site(string $site = '@') {
			echo "<meta name='twitter:site' content='$site'>";
		}

		public static function twitter_creator(string $creator = '@') {
			echo "<meta name='twitter:creator' content='$creator'>";
		}

		public static function twitter_title(string $title = null) {
			if ($title) {
				echo "<meta name='twitter:title' content='$title'>";
			} else {
				echo "<meta name='twitter:title' content='" . Values::$basic['name'] . "'>";
			}
		}

		public static function twitter_description(string $description = null) {
			if ($description) {
				echo "<meta name='twitter:description' content='$description'>";
			} else {
				echo "<meta name='twitter:description' content='" . Values::$basic['name'] . "'>";
			}
		}

		public static function twitter_image(string $image = null) {
			if ($image) {
				echo "<meta name='twitter:image' content='$image'>";
			} else {
				echo "<meta name='twitter:image' content='" . Values::$images['favicon'] . "'>";
			}
		}

		public static function og_title(string $title = null) {
			if ($title) {
				echo "<meta property='og:title' content='$title'>";
			} else {
				echo "<meta property='og:title' content='" . Values::$basic['name'] . "'>";
			}
		}

		public static function og_type(string $type = 'website') {
			echo "<meta property='og:type' content='$type'>";
		}

		public static function og_url(string $url = null) {
			if ($url) {
				echo "<meta property='og:url' content='$url'>";
			} else {
				echo "<meta property='og:url' content='" . Values::$assets['core'] . "'>";
			}
		}

		public static function og_image(string $image = null) {
			if ($image) {
				echo "<meta property='og:image' content='$image'>";
			} else {
				echo "<meta property='og:image' content='" . Values::$images['favicon'] . "'>";
			}
		}

		public static function og_description(string $description = null) {
			if ($description) {
				echo "<meta property='og:description' content='$description'>";
			} else {
				echo "<meta property='og:description' content='" . Values::$basic['name'] . "'>";
			}
		}

		public static function og_site_name(string $site_name = null) {
			if ($site_name) {
				echo "<meta property='og:site_name' content='$site_name'>";
			} else {
				echo "<meta property='og:site_name' content='" . Values::$basic['name'] . "'>";
			}
		}

	}
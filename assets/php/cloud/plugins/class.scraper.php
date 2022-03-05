<?php

	class Scraper {

		private $url, $fav_size, $shot_w_size, $shot_h_size;

		private function host(): string {
			return gethostbyname(
				$this->domain()
			); 
		}

		private function hashes(): array {
			return [
				'md5'		=>	md5($this->url),
				'sha1'		=>	sha1($this->url),
				'sha256'	=>	hash('sha256', $this->url),	
			];
		}

		private function title(): string {
			return preg_match(
				'/<title[^>]*>(.*?)<\/title>/ims', file_get_contents($this->url), $match
			) ? $match[1] : null;
		}

		private function robots(): string {
			if (file_get_contents($this->url . '/robots.txt') != '') {
				return file_get_contents($this->url . '/robots.txt');
			}

			return false;
		}

		private function domain(): string {
			return explode(
				'/', preg_replace(
					"(^https?://)", '', $this->url
				)
			)[0];
		}

		private function favicon(): string {
			return "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&url=" . $this->url . "&size=" . $this->fav_size;
		}

		private function screenshot(): string {
			return "https://s0.wp.com/mshots/v1/" . $this->url . "?w=" . $this->shot_w_size . "&h=" . $this->shot_h_size;
		}

		private function headers() { return get_headers($this->url); }

		public function __construct() {
			if (isset($_GET['link'])) {
				$this->url	=	$_GET['link'];
			}

			$this->fav_size		=	($_GET['fav_size']) ? $_GET['fav_size'] : 32;
			$this->shot_w_size	=	($_GET['shot_w_size']) ? $_GET['shot_w_size'] : 640;
			$this->shot_h_size	=	($_GET['shot_h_size']) ? $_GET['shot_h_size'] : 480;
		}

		public function execute(): void {
			Callback::json(200, [
				'url'			=>	$this->url,
				'host'			=>	$this->host(),
				'title'			=>	$this->title(),
				'domain'		=>	$this->domain(),
				'favicon'		=>	$this->favicon(),
				'screenshot'	=>	$this->screenshot(),

				'hashes'		=>	$this->hashes(),

				'meta'			=>	[
					'robots'	=>	$this->robots(),
					'headers'	=>	$this->headers(),
				],
			]);
		}

	}
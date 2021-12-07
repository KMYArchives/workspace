<?php

	class Imgur {

		private $client_id, $url_api;

		private function imgur_request(string $type): string {
			return match(
				strtolower($type)
			) {
				'get'		=>	'GET',
				'post'		=>	'POST',
				'delete'	=>	'DELETE',
				'options'	=>	'OPTIONS',
			};
		}

		private function imgur_api(string $image = null): string {
			if ($image) {
				return $this->url_api . "/$image";
			} else {
				return $this->url_api;
			}
		}

		public function __construct() {
			Utils::load_env();
			
			$this->client_id	=	$_ENV['IMGUR_API_CLIENT'];
			$this->url_api		=	'https://api.imgur.com/3/image';
		}

		public function get(string $image): mixed {
			$curl = curl_init();

			curl_setopt_array($curl, [
				CURLOPT_TIMEOUT			=>	0,
				CURLOPT_ENCODING		=>	'',
				CURLOPT_MAXREDIRS		=>	10,
				CURLOPT_RETURNTRANSFER	=>	true,
				CURLOPT_FOLLOWLOCATION	=>	true,
				CURLOPT_HTTP_VERSION	=>	CURL_HTTP_VERSION_1_1,
				CURLOPT_URL				=>	$this->imgur_api($image),
				CURLOPT_CUSTOMREQUEST	=>	$this->imgur_request('get'),
				CURLOPT_HTTPHEADER		=>	[
					'Authorization: Client-ID ' . $this->client_id
				],
			]);

			$response	=	curl_exec($curl);
			curl_close($curl);
			
			return json_decode($response, true);
		}

		public function delete(string $image): mixed {
			$curl = curl_init();

			curl_setopt_array($curl, [
				CURLOPT_TIMEOUT			=>	0,
				CURLOPT_ENCODING		=>	'',
				CURLOPT_MAXREDIRS		=>	10,
				CURLOPT_RETURNTRANSFER	=>	true,
				CURLOPT_FOLLOWLOCATION	=>	true,
				CURLOPT_HTTP_VERSION	=>	CURL_HTTP_VERSION_1_1,
				CURLOPT_URL				=>	$this->imgur_api($image),
				CURLOPT_CUSTOMREQUEST	=>	$this->imgur_request('delete'),
				CURLOPT_HTTPHEADER		=>	[
					'Authorization: Client-ID ' . $this->client_id
				],
			]);

			$response	=	curl_exec($curl);
			curl_close($curl);
			
			return json_decode($response, true);
		}

		public function upload(string $image): mixed {
			$curl = curl_init();

			curl_setopt_array($curl, [
				CURLOPT_TIMEOUT			=>	0,
				CURLOPT_ENCODING		=>	'',
				CURLOPT_MAXREDIRS		=>	10,
				CURLOPT_RETURNTRANSFER	=>	true,
				CURLOPT_FOLLOWLOCATION	=>	true,
				CURLOPT_URL				=>	$this->imgur_api(),
				CURLOPT_HTTP_VERSION	=>	CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST	=>	$this->imgur_request('post'),
				CURLOPT_POSTFIELDS		=>	[
					'image'				=>	$image
				],
				CURLOPT_HTTPHEADER		=>	[
					'Authorization: Client-ID ' . $this->client_id
				],
			]);

			$response		=	curl_exec($curl);
			curl_close($curl);
			
			return json_decode($response, true);
		}

	}
<?php

	class Hashes {

		private $db, $clients;

		private function term(): string {
			if (Clean::default($_GET['term'])) {
				return "AND name LIKE '%" . Clean::default($_GET['term']) . "%'";
			} else {
				return '';
			}
		}

		private function filter(): string {
			return match (
				Clean::string(
					$_GET['filter'], 'az'
				)
			) {
				default			=>	"AND privacy = 'public'",
				'public'		=>	"AND privacy = 'public'",
				'favorites'		=>	"AND favorited = 'true'",
				'private'		=>	"AND privacy = 'private'",
				'collections'	=>	"AND collection = '" . Clean::numbers($_GET['col']) . "'",
			};
		}

		public function get(): mixed {
			foreach ($this->db->query("SELECT * FROM ws_hashes WHERE slug = ? AND username = ?", [
				Clean::slug($_GET['slug']), 
				$this->clients->get_id($_GET['username'])
			]) as $data);

			Headers::setHttpCode(200);
			Headers::setContentType('application/json');
			echo json_encode([
				'name'				=>	$data['name'],
				'size'				=>	$data['size'],
				'type'				=>	$data['type'],
				'added_in'			=>	$data['added_in'],
				'collation'			=>	$data['collation'],
				'content'			=>	File::read(Values::$assets['hashes'] . $data['json_file'], [
					'json_decode'	=>	true
				]),
			]);
		}

		public function list(): mixed {
			$sql_max	=	Values::$assets['sql_max'];
			$offset		=	($_GET['offset']) ? Clean::numbers($_GET['offset']) : 0;

			$where		=	$this->term() . " " . $this->filter();
			foreach ($this->db->query("SELECT slug, name, size, added_in FROM ws_hashes WHERE username = ? $where LIMIT $offset, $sql_max", [
				$this->clients->get_id($_GET['username'])
			]) as $data) {
				$list[]			=	[
					'slug'		=>	$data['slug'],
					'name'		=>	$data['name'],
					'size'		=>	$data['size'],
					'added_in'	=>	$data['added_in'],
				];
			}

			Headers::setHttpCode(200);
			Headers::setContentType('application/json');
			echo json_encode([
				'list'	=>	$list,
				'total'	=>	$this->db->query("SELECT count(*) FROM ws_hashes WHERE username = ? $where", [
					$this->clients->get_id($_GET['username'])
				])[0]['count(*)']
			]);
		}

		public function __construct() {
			$this->db		=	new DB;
			$this->clients	=	new Clients;
		}

		public function create(): mixed {
			$slug		=	Random::slug([ 36, 48 ]);
			$json_file	=	Random::string(36, true, true, true);

			if (File::create(Values::$assets['hashes'] . $json_file, $_POST['content'])) {
				if ($this->db->query("INSERT INTO ws_hashes(slug, json_file, name, type, username) VALUES(?, ?, ?, ?, ?)", [
					$slug,
					$json_file,
					Clean::sql($_POST['name']),
					Clean::sql($_POST['type']),

					$this->clients->get_id($_POST['username'])
				])) {
					Headers::setHttpCode(200);
					echo json_encode([ 'return'	=> 'success' ]);
				} else {
					Headers::setHttpCode(500);
					echo json_encode([ 'return' => 'error-db-create-hash' ]);
				}
			} else {
				Headers::setHttpCode(500);
				echo json_encode([ 'return' => 'error-file-create-hash' ]);
			}
		}

	}
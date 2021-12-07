<?php

	class Hashes {

		private $db, $clients;

		private function term() {
			if (Clean::default($_GET['term'])) {
				return "AND name LIKE '%" . Clean::default($_GET['term']) . "%'";
			} else {
				return '';
			}
		}

		private function filter() {
			switch (Clean::string($_GET['filter'], 'az')) {
				case 'public':
					return "AND privacy = 'public'"; 
					break;

				case 'private':
					return "AND privacy = 'private'"; 
					break;
				
				case 'favorites':
					return "AND favorited = 'true'"; 
					break;
				
				case 'collections':
					return "AND collection = '" . Clean::numbers($_GET['col']) . "'"; 
					break;

				default:
					return "AND privacy = 'public'"; 
					break;
			}
		}

		public function get() {
			foreach ($this->db->query("SELECT * FROM ws_hashes WHERE slug = ? AND username = ?", [
				Clean::slug($_GET['slug']), 
				$this->clients->get_id($_GET['username'])
			]) as $data);

			header('Content-Type: application/json');
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

		public function list() {
			$sql_max	=	Values::$assets['sql_max'];
			$offset		=	($_GET['offset']) ? Clean::numbers($_GET['offset']) : 0;

			$where		=	$this->term() . " " . $this->filter();
			foreach ($this->db->query("SELECT slug, name, size, added_in, collection FROM ws_hashes WHERE username = ? $where LIMIT $offset, $sql_max", [
				$this->clients->get_id($_GET['username'])
			]) as $data) {
				$list[]			=	[
					'slug'		=>	$data['slug'],
					'name'		=>	$data['name'],
					'size'		=>	$data['size'],
					'added_in'	=>	$data['added_in'],
					'collation'	=>	$data['collation'],
				];
			}

			header('Content-Type: application/json');
			echo json_encode([
				'list'	=>	$list,
				'total'	=>	$this->db->query("SELECT count(*) FROM ws_hashes WHERE username = ? $where", [
					$this->clients->get_id($_GET['username'])
				])[0]['count(*)']
			]);
		}

		public function create() {
			$slug	=	Random::string(36, true, true, true);
			$file	=	Random::string(36, true, true, true);

			if (File::create(Values::$assets['hashes'] . $file, $_POST['content'])) {
				if ($this->db->query("INSERT INTO ws_hashes(slug, json_file, name, type, username) VALUES(?, ?, ?, ?, ?)", [
					$slug,
					$json_file,
					Clean::sql($_POST['name']),
					Clean::sql($_POST['type']),

					$this->clients->get_id($_POST['username'])
				])) {
					echo json_encode([ 'return'	=> 'success' ]);
				} else {
					echo json_encode([ 'return' => 'error-db-create-hash' ]);
				}
			} else {
				echo json_encode([ 'return' => 'error-file-create-hash' ]);
			}
		}

		public function __construct() {
			$this->db		=	new DB;
			$this->clients	=	new Clients;
		}

	}
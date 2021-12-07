<?php

	class Models {

		private $db, $clients, $diagrams_meta;

		private function term(): string {
			if (Clean::default($_GET['term'])) {
				return "AND name LIKE '%" . Clean::default($_GET['term']) . "%'";
			} else {
				return '';
			}
		}

		private function filter(): string {
			return match(
				Clean::string(
					$_GET['filter'], 'az'
				)
			) {
				default			=>	"AND privacy = 'public'",
				'public'		=>	"AND privacy = 'public'",
				'favorites'		=>	"AND favorited = 'true'",
				'private'		=>	"AND privacy = 'private'",
				'linked'		=>	"AND slug != '" . Clean::slug($_GET['slug']) . "'",
				'collections'	=>	"AND collection = '" . Clean::numbers($_GET['col']) . "'",
			};
		}

		private function set_meta(): mixed {
			return json_encode([
				'engine'			=>	Clean::sql($_POST['engine']),
				'comment'			=>	Clean::sql($_POST['comment']),
				'temporary'			=>	Clean::sql($_POST['temporary']),
				'collation'			=>	Clean::sql($_POST['collation']),
				'row_format'		=>	Clean::sql($_POST['row_format']),
				'auto_increment'	=>	Clean::sql($_POST['auto_increment']),
			]);
		}

		private function get_meta(mixed $data): mixed {
			return json_decode(
				$data, true
			);
		}

		private function delete_files(array $data): mixed {
			File::delete(Values::$assets['models']['sql']. $data['sql_file']);
			File::delete(Values::$assets['models']['json']. $data['json_file']);
		}

		public function get(): mixed {
			foreach ($this->db->query("SELECT * FROM ws_models WHERE slug = ? AND username = ?", [
				Clean::slug($_GET['slug']), 
				$this->clients->get_id($_GET['username'])
			]) as $data);

			header('Content-Type: application/json');
			echo json_encode([
				'name'				=>	$data['name'],
				'added_in'			=>	$data['added_in'],
				'favorited'			=>	$data['favorited'],
				'metadata'			=>	$this->get_meta($data['metadata']),

				'diagram'			=>	[
					'slug'			=>	$this->diagrams_meta->get_data($data['diagram'], 'slug'),
					'link'			=>	$this->diagrams_meta->get_data($data['diagram'], 'image'),
				],

				'content'			=>	File::read(Values::$assets['models']['sql'] . $data['sql_file']),
				'colunms'			=>	File::read(Values::$assets['models']['json'] . $data['json_file'], [
					'json_decode'	=>	true
				]),
			]);
		}

		public function __construct() {
			$this->db				=	new DB;
			$this->clients			=	new Clients;
			$this->diagrams_meta	=	new DiagramsMeta;
		}

		public function list(): mixed {
			$sql_max	=	Values::$assets['sql_max'];
			$where		=	$this->term() . " " . $this->filter();
			$username	=	$this->clients->get_id($_GET['username']);
			$offset		=	($_GET['offset']) ? Clean::numbers($_GET['offset']) : 0;

			foreach ($this->db->query("SELECT slug, name, metadata, added_in FROM ws_models WHERE username = ? $where LIMIT $offset, $sql_max", [
				$username
			]) as $data) {
				$list[]			=	[
					'slug'		=>	$data['slug'],
					'name'		=>	$data['name'],
					'added_in'	=>	$data['added_in'],
					'metadata'	=>	$this->get_meta($data['metadata']),
				];
			}

			header('Content-Type: application/json');
			echo json_encode([
				'list'	=>	$list,
				'total'	=>	$this->db->query("SELECT count(*) FROM ws_models WHERE username = ? $where", [
					$username
				])[0]['count(*)']
			]);
		}

		public function create(): mixed {
			$slug		=	Random::slug([ 36, 48 ]);
			$sql_file	=	Random::string(36, true, true, true);
			$json_file	=	Random::string(36, true, true, true);

			if (File::create(Values::$assets['models']['sql'] . $sql_file, $_POST['sql_content'])) {
				if (File::create(Values::$assets['models']['json'] . $json_file, $_POST['json_content'])) {
					if ($this->db->query("INSERT INTO ws_models(slug, sql_file, json_file, metadata, name, username) VALUES(?, ?, ?, ?, ?, ?)", [
						$slug,
						$sql_file,
						$json_file,
						$this->set_meta(),
						Clean::sql($_POST['name']),

						$this->clients->get_id($_POST['username']),
					])) {
						echo json_encode([
							'slug'		=>	$slug,
							'return'	=>	'success',
						]);
					} else {
						echo json_encode([ 'return' => 'error-db-create-model' ]);
					}
				} else {
					echo json_encode([ 'return' => 'error-file-create-json' ]);
				}
			} else {
				echo json_encode([ 'return' => 'error-file-create-sql' ]);
			}
		}

		public function delete(): mixed {
			header('Content-type: application/json');

			foreach ($this->db->query("SELECT sql_file, json_file, username FROM ws_models WHERE slug = ? AND username = ?", [
				Clean::slug($_POST['slug']), 
				$this->clients->get_id($_POST['username']),
			]) as $data);

			if ($this->db->query("DELETE FROM ws_models WHERE slug = ? AND username = ?" , [
				Clean::slug($_POST['slug']), 
				$data['username']
			])) {
				$this->delete_files($data);
				echo json_encode([ 'return' => 'success' ]);
			} else {
				echo json_encode([ 'return' => 'error-db-unlink-model' ]);
			}
		}

	}
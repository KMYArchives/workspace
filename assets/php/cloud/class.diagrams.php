<?php

	class Diagrams {

		private $db, $imgur, $client, $models_meta, $diagrams_meta;

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
				'collections'	=>	"AND collection = '" . Clean::numbers($_GET['col']) . "'",
			};
		}

		public function get(): mixed {
			foreach ($this->db->query("SELECT * FROM ws_diagrams WHERE slug = ? AND username = ?", [
				Clean::slug($_GET['slug']), 
				$this->clients->get_id($_GET['username'])
			]) as $data);

			Callback::json(200, [
				'name'			=>	$data['name'],
				'size'			=>	$data['size'],
				'mime'			=>	$data['mime'],
				'image'			=>	$data['image'],
				'added_in'		=>	$data['added_in'],
				'favorited'		=>	$data['favorited'],
			]);
		}

		public function __construct() {
			$this->db				=	new DB;
			$this->imgur			=	new Imgur;
			$this->clients			=	new Clients;
			$this->models_meta		=	new ModelsMeta;
			$this->diagrams_meta	=	new DiagramsMeta;
		}

		public function list(): mixed {
			$sql_max	=	Values::$assets['sql_max'];
			$where		=	$this->term() . " " . $this->filter();
			$offset		=	($_GET['offset']) ? Clean::numbers($_GET['offset']) : 0;

			foreach ($this->db->query("SELECT slug, name, size, added_in FROM ws_diagrams WHERE username = ? $where LIMIT $offset, $sql_max", [
				$this->clients->get_id($_GET['username'])
			]) as $data) {
				$list[]			=	[
					'slug'		=>	$data['slug'],
					'name'		=>	$data['name'],
					'size'		=>	$data['size'],
					'added_in'	=>	$data['added_in'],
				];
			}

			Callback::json(200, [
				'list'	=>	$list,
				'total'	=>	$this->db->query("SELECT count(*) FROM ws_diagrams WHERE username = ? $where", [
					$this->clients->get_id($_GET['username'])
				])[0]['count(*)']
			]);
		}

		public function create(): mixed {
			$slug	=	Random::slug([ 36, 48 ]);
			$imgur	=	$this->imgur->upload($_POST['image']);

			if ($this->db->query("INSERT INTO ws_diagrams(slug, name, image_id, image, size, mime, delete_hash, username) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [
				$slug,
				Clean::sql($_POST['name']),
				
				$imgur['data']['id'],
				$imgur['data']['link'],
				$imgur['data']['size'],
				$imgur['data']['type'],
				$imgur['data']['deletehash'],

				$this->clients->get_id($_GET['username'])
			])) {
				if (Clean::slug($_POST['model'])) {
					$this->models_meta->change_diagram(
						$this->diagrams_meta->get_data($slug, 'id')
					);
				}

				Callback::json(200, [
					'slug'		=>	$slug,
					'return'	=> 'success',
					'image'		=>	$imgur['data']['link'],
					'id'		=>	$this->diagrams_meta->get_data($slug, 'id'),
				]);
			} else {
				Callback::json(500, [ 'return' => 'error-db-create-diagram' ]);
			}
		}

		public function delete(): mixed {
			foreach ($this->db->query("SELECT slug, delete_hash FROM ws_diagrams WHERE slug = ? AND username = ?", [
				Clean::slug($_POST['slug']), 
				$this->clients->get_id($_POST['username'])
			]) as $data);

			if ($this->imgur->delete($data['delete_hash'])) {
				if ($this->db->query("DELETE FROM ws_diagrams WHERE slug = ? AND username = ?" , [
					$data['slug'], 
					$this->clients->get_id() 
				])) {
					Callback::json(200, [ 'return' => 'success' ]);
				} else {
					Callback::json(500, [ 'return' => 'error-db-unlink-diagram' ]);
				}
			}
		}

	}
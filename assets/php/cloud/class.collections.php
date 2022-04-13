<?php

	class Collections {

		private $db, $clients;

		private function filter() {
			return match(
				Clean::string(
					$_GET['filter'], 'az'
				)
			) {
				default		=>	"AND privacy = 'public'",
				'public'	=>	"AND privacy = 'public'",
				'private'	=>	"AND privacy = 'private'",
			};
		}

		public function get() {
			foreach ($this->db->query("SELECT slug, name, collation, privacy, added_in FROM ws_collections WHERE slug = ? AND username = ?", [
				Clean::slug($_GET['slug']), 
				$this->clients->get_id($_GET['username'])
			]) as $data);

			Callback::json(200, $data);
		}

		public function list() {
			$filter		=	$this->filter();
			$sql_max	=	Values::$assets['sql_max'];
			$client		=	$this->clients->get_id($_GET['username']);
			$offset		=	($_GET['offset']) ? Clean::numbers($_GET['offset']) : 0;

			Callback::json(200, [
				'list'	=>	$this->db->query("SELECT id, slug, name, privacy, added_in FROM ws_collections WHERE username = ? $filter LIMIT $offset, $sql_max", [
					$client
				]),
				'total'	=>	$this->db->query("SELECT count(*) FROM ws_collections WHERE username = ? $filter", [
					$client
				])[0]['count(*)']
			]);
		}

		public function edit() {
			if ($this->db->query("UPDATE ws_collections SET name = ?, collation = ?, privacy = ? WHERE slug = ? AND username = ?", [
				Clean::sql($_POST['name']),
				Clean::default($_POST['collation']),
				Clean::string($_POST['privacy'], 'az'),

				Clean::slug($_POST['slug']),
				$this->clients->get_id(),
			])) {
				Callback::json(200, [ 
					'return' 	=> 'success',
					'privacy'	=>	Clean::string($_POST['privacy'], 'az'),
				]);
			} else {
				Callback::json(500, [ 'return' => 'error-db-edited-collection' ]);
			}
		}

		public function create() {
			if ($this->db->query("INSERT INTO ws_collections(slug, name, collation, privacy, username) VALUES(?, ?, ?, ?, ?)", [
				Random::string(36, true, true, true),
				Clean::sql($_POST['name']),
				Clean::default($_POST['collation']),
				Clean::string($_POST['privacy'], 'az'),

				$this->clients->get_id(),
			])) {
				Callback::json(200, [ 'return'	=> 'success' ]);
			} else {
				Callback::json(500, [ 'return' => 'error-db-create-cllections' ]);
			}
		}

		public function delete() {
			foreach ($this->db->query("SELECT id, username, slug FROM ws_collections WHERE slug = ? AND username = ?", [
				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			]) as $data);

			if ($this->db->query("DELETE FROM ws_collections WHERE slug = ? AND username = ?" , [
				$data['slug'], 
				$data['username'],
			])) {
				Callback::json(200, [ 'return' => 'success' ]);
			} else {
				Callback::json(500, [ 'return' => 'error-db-unlink-collection' ]);
			}
		}

		public function name($id) {
			foreach ($this->db->query("SELECT name FROM ws_collections WHERE id = ? AND username = ?", [
				$id,
				$this->clients->get_id()
			]) as $data);

			return $data['name'];
		}

		public function __construct() {
			$this->db		=	new DB;
			$this->clients	=	new Clients;
		}
		
	}
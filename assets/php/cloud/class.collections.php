<?php

	class Collections {

		private $db, $clients;

		private function filter() {
			switch (Clean::string($_GET['filter'], 'az')) {
				case 'public':
					return "AND privacy = 'public'"; 
					break;

				case 'private':
					return "AND privacy = 'private'"; 
					break;

				default:
					return "AND privacy = 'public'"; 
					break;
			}
		}

		public function get() {
			foreach ($this->db->query("SELECT slug, name, collation, privacy, added_in FROM ws_collections WHERE slug = ? AND username = ?", [
				Clean::slug($_GET['slug']), 
				$this->clients->get_id($_GET['username'])
			]) as $data);

			Headers::setContentType('application/json');
			echo json_encode($data);
		}

		public function list() {
			$filter		=	$this->filter();
			$sql_max	=	Values::$assets['sql_max'];
			$client		=	$this->clients->get_id($_GET['username']);
			$offset		=	($_GET['offset']) ? Clean::numbers($_GET['offset']) : 0;

			Headers::setContentType('application/json');
			echo json_encode([
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
				echo json_encode([ 
					'return' 	=> 'success',
					'privacy'	=>	Clean::string($_POST['privacy'], 'az'),
				]);
			} else {
				echo json_encode([ 'return' => 'error-db-edited-collection' ]);
			}
		}

		public function create() {
			Headers::setContentType('application/json');

			if ($this->db->query("INSERT INTO ws_collections(slug, name, collation, privacy, username) VALUES(?, ?, ?, ?, ?)", [
				Random::string(36, true, true, true),
				Clean::sql($_POST['name']),
				Clean::default($_POST['collation']),
				Clean::string($_POST['privacy'], 'az'),

				$this->clients->get_id(),
			])) {
				echo json_encode([ 'return'	=> 'success' ]);
			} else {
				echo json_encode([ 'return' => 'error-db-create-cllections' ]);
			}
		}

		public function delete() {
			Headers::setContentType('application/json');

			foreach ($this->db->query("SELECT id, username, slug FROM ws_collections WHERE slug = ? AND username = ?", [
				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			]) as $data);

			if ($this->db->query("DELETE FROM ws_collections WHERE slug = ? AND username = ?" , [
				$data['slug'], 
				$data['username'],
			])) {
				echo json_encode([ 'return' => 'success' ]);
			} else {
				echo json_encode([ 'return' => 'error-db-unlink-collection' ]);
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
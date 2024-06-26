<?php

	class Tokens {

		private $db, $clients;

		private function term() {
			if (Clean::default($_GET['term'])) {
				return "AND name LIKE '%" . Clean::default($_GET['term']) . "%'";
			} else {
				return '';
			}
		}

		private function generate_token() {
			return Hash::token(
				Random::string(
					64, true, true, true
				)
			);
		}

		public function get() {
			foreach ($this->db->query("SELECT * FROM ws_models WHERE slug = ? AND username = ?", [
				Clean::slug($_GET['slug']), 
				$this->clients->get_id()
			]) as $data);

			Callback::json(200, [
				'name'		=>	$data['name'],
				'token'		=>	$data['token'],
				'added_in'	=>	$data['added_in'],
				'expires'	=>	$data['expires_in'],
			]);
		}

		public function list() {
			$sql_max	=	Values::$assets['sql_max'];
			$username	=	$this->clients->get_id($_GET['username']);
			$offset		=	($_GET['offset']) ? Clean::numbers($_GET['offset']) : 0;

			foreach ($this->db->query("SELECT slug, name, added_in FROM ws_tokens WHERE username = ? " . $this->term() . " LIMIT $offset, $sql_max", [
				$username
			]) as $data) {
				$list[]			=	[
					'slug'		=>	$data['slug'],
					'name'		=>	$data['name'],
					'added_in'	=>	$data['added_in'],
				];
			}

			Callback::json(200, [
				'list'	=>	$list,
				'total'	=>	$this->db->query("SELECT count(*) FROM ws_tokens WHERE username = ? $where", [
					$username
				])[0]['count(*)']
			]);
		}

		public function verify() {
			// code...
		}

		public function create() {
			$token	=	$this->generate_token();
			$slug	=	Random::string(36, true, true, true);

			if ($this->db->query("INSERT INTO ws_tokens(slug, token, name) VALUES(?, ?, ?)", [
				$slug,
				$token,
				Clean::default($_POST['name']),
			])) {
				Callback::json(200, [
					'result'	=>	true,
					'slug'		=>	$slug,
					'token'		=>	$token,
				]);
			} else {
				Callback::json(500, [ 'result' => 'error-db-create-token' ]);
			}
		}

		public function delete() {
			if ($this->db->query("DELETE FROM ws_tokens WHERE slug = ? AND username = ?", [
				Clean::slug($_POST['slug']),
				$this->clients->get_id(),
			])) {
				Callback::json(200, [ 'result' => true ]);
			} else {
				Callback::json(500, [ 'result' => 'error-db-delete-token' ]);
			}
		}

		public function __construct() {
			$this->clients	=	new Clients;
			$this->db		=	new Database;
		}

	}
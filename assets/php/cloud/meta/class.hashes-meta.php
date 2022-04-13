<?php

	class HashesMeta {

		private $db, $clients;

		private function delete_file($data) {
			File::delete(
				Values::$assets['hashes']. $data['json_file']
			);
		}

		public function delete() {
			Headers::setContentType('application/json');

			foreach ($this->db->query("SELECT json_file FROM ws_hashes WHERE slug = ? AND username = ?", [
				Clean::slug($_POST['slug']), 
				$this->clients->get_id(),
			]) as $data);

			if ($this->db->query("DELETE FROM ws_hashes WHERE slug = ? AND username = ?" , [
				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			])) {
				$this->delete_file($data);
				
				Callback::json(200, [ 'return' => 'success' ]);
			} else {
				Callback::json(500, [ 'return' => 'error-db-unlink-hash' ]);
			}
		}

		public function favorite() {
			foreach ($this->db->query("SELECT slug, favorited, username FROM ws_hashes WHERE slug = ? AND username = ? LIMIT 1" , [ 
				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			]) as $data);

			if ($data['favorited'] == 'true') {
				$favorited	=	'false';
			} else {
				$favorited	=	'true';
			}

			if ($this->db->query("UPDATE ws_hashes SET favorited = ? WHERE slug = ? AND username = ?", [
				$favorited,
				$data['slug'],
				$data['username'],
			])) {
				Callback::json(200, [
					'return'	=>	'success',
					'favorited'	=>	$favorited
				]);
			} else {
				Callback::json(500, [ 'return' => 'error-favorite-hash' ]);
			}
		}

		public function __construct() {
			$this->db		=	new DB;
			$this->clients	=	new Clients;
		}

		public function change_privacy() {
			foreach ($this->db->query("SELECT slug, privacy, username FROM ws_models WHERE slug = ? AND username = ? LIMIT 1" , [ 
				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			]) as $data);

			if ($data['privacy'] == 'public') {
				$privacy	=	'private';
			} else if ($data['privacy'] == 'private') {
				$privacy	=	'public';
			}

			if ($this->db->query("UPDATE ws_models SET privacy = ? WHERE slug = ? AND username = ?", [
				$privacy,
				$data['slug'],
				$data['username'],
			])) {
				Callback::json(200, [ 'return' => 'success' ]);
			} else {
				Callback::json(500, [ 'return' => 'error-change-privacy-model' ]);
			}
		}

		public function change_collection(int|string $col = null) {
			if (!$col) { $col = Clean::numbers($_POST['col']); }

			if ($this->db->query("UPDATE ws_hashes SET collection = ? WHERE slug = ? AND username = ?", [
				$col,
				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			])) {
				foreach ($this->db->query("SELECT name FROM ws_collections WHERE id = ? AND username = ?", [
					Clean::numbers($col),
					$this->clients->get_id() 
				]) as $data);

				Callback::json(200, [
					'return'		=>	'success',
					'collection'	=>	[
						'id'		=>	$col,
						'name'		=>	$data['name'],
					]
				]);
			} else {
				Callback::json(500, [ 'return' => 'error-change-collection' ]);
			}
		}

	}
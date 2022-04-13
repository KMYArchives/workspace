<?php

	class DiagramsMeta {

		private $db, $clients, $collections;

		public function __construct() {
			$this->db			=	new DB;
			$this->clients		=	new Clients;
			$this->collections	=	new Collections;
		}

		public function favorite(): mixed {
			foreach ($this->db->query("SELECT slug, favorited, username FROM ws_diagrams WHERE slug = ? AND username = ? LIMIT 1" , [ 
				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			]) as $data);

			if ($data['favorited'] == 'true') {
				$favorited	=	'false';
			} else {
				$favorited	=	'true';
			}

			if ($this->db->query("UPDATE ws_diagrams SET favorited = ? WHERE slug = ? AND username = ?", [
				$favorited,
				$data['slug'],
				$data['username'],
			])) {
				Callback::json(200, [
					'return'	=>	'success',
					'favorited'	=>	$favorited
				]);
			} else {
				Callback::json(500, [ 'return' => 'error-favorite-diagram' ]);
			}
		}

		public function get_options(): mixed {
			foreach ($this->db->query("SELECT privacy, collection FROM ws_diagrams WHERE slug = ? AND username = ?", [
				Clean::slug($_GET['slug']), 
				$this->clients->get_id(),
			]) as $data);

			Callback::json(200, [
				'privacy'			=>	$data['privacy'],
				'collection'		=>	[
					'id'			=>	$data['collection'],
					'name'			=>	$this->collections->name($data['collection']),
				],
			]);
		}

		public function change_privacy(): mixed {
			foreach ($this->db->query("SELECT slug, privacy, username FROM ws_diagrams WHERE slug = ? AND username = ? LIMIT 1" , [ 
				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			]) as $data);

			if ($data['privacy'] == 'public') {
				$privacy	=	'private';
			} else if ($data['privacy'] == 'private') {
				$privacy	=	'public';
			}

			if ($this->db->query("UPDATE ws_diagrams SET privacy = ? WHERE slug = ? AND username = ?", [
				$privacy,
				$data['slug'],
				$data['username'],
			])) {
				Callback::json(200, [ 'return' => 'success' ]);
			} else {
				Callback::json(500, [ 'return' => 'error-change-privacy-diagram' ]);
			}
		}

		public function get_data(int|string $id, string $field): mixed {
			foreach ($this->db->query("SELECT * FROM ws_diagrams WHERE id = ? OR slug = ?", [
				$id, $id
			]) as $data);

			return $data[$field];
		}

		public function change_collection(int|string $col = null): mixed {
			if (!$col) { $col = Clean::numbers($_POST['col']); }

			if ($this->db->query("UPDATE ws_diagrams SET collection = ? WHERE slug = ? AND username = ?", [
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
				Callback::json(500, [ 'return' => 'error-change-collection-diagram' ]);
			}
		}

	}
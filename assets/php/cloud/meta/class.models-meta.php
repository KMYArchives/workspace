<?php

	class ModelsMeta {

		private $db, $clients;

		public function __construct() {
			$this->db		=	new DB;
			$this->clients	=	new Clients;
		}

		public function download(): void {
			foreach ($this->db->query("SELECT name, sql_file FROM ws_models WHERE slug = ? AND username = ?", [
				Clean::slug($_GET['slug']), 
				$this->clients->get_id()
			]) as $data);
			
			File::download([
				'file'	=>	$data['sql_file'],
				'name'	=>	$data['name'] . '.sql',
				'path'	=>	Values::$assets['models']['sql'],
			]);
		}

		public function favorite(): string {
			foreach ($this->db->query("SELECT slug, favorited, username FROM ws_models WHERE slug = ? AND username = ? LIMIT 1" , [ 
				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			]) as $data);

			if ($data['favorited'] == 'true') {
				$favorited	=	'false';
			} else {
				$favorited	=	'true';
			}

			Headers::setContentType('application/json');
			if ($this->db->query("UPDATE ws_models SET favorited = ? WHERE slug = ? AND username = ?", [
				$favorited,
				$data['slug'],
				$data['username'],
			])) {
				echo json_encode([ 
					'return'	=>	'success',
					'favorited'	=>	$favorited
				]);
			} else {
				echo json_encode([ 'return' => 'error-favorite-model' ]);
			}
		}

		public function get_options(): string {
			$collections	=	new Collections;
			
			foreach ($this->db->query("SELECT privacy, collection FROM ws_models WHERE slug = ? AND username = ?", [
				Clean::slug($_GET['slug']), 
				$this->clients->get_id(),
			]) as $data);

			Headers::setContentType('application/json');
			echo json_encode([
				'privacy'		=>	$data['privacy'],
				'collection'	=>	[
					'id'		=>	$data['collection'],
					'name'		=>	$collections->name($data['collection']),
				],
			]);
		}

		public function change_privacy(): string {
			foreach ($this->db->query("SELECT slug, privacy, username FROM ws_models WHERE slug = ? AND username = ? LIMIT 1" , [ 
				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			]) as $data);

			if ($data['privacy'] == 'public') {
				$privacy	=	'private'; 
			} else if ($data['privacy'] == 'private') {
				$privacy	=	'public';
			}

			Headers::setContentType('application/json');
			if ($this->db->query("UPDATE ws_models SET privacy = ? WHERE slug = ? AND username = ?", [
				$privacy,
				$data['slug'],
				$data['username'],
			])) {
				echo json_encode([ 'return' => 'success' ]);
			} else {
				echo json_encode([ 'return' => 'error-change-privacy-model' ]);
			}
		}

		public function change_diagram(string $diagram): string {
			if ($this->db->query("UPDATE ws_models SET diagram = ? WHERE slug = ? AND username = ?", [
				$diagram,

				Clean::slug($_POST['model']), 
				$this->clients->get_id() 
			])) {
				echo json_encode([ 'return' => 'success' ]);
			} else {
				echo json_encode([ 'return' => 'error-change-diagram-model' ]);
			}
		}

		public function change_collection(int|string $col = null): string {
			if (!$col) { $col = Clean::numbers($_POST['col']); }

			Headers::setContentType('application/json');
			if ($this->db->query("UPDATE ws_models SET collection = ? WHERE slug = ? AND username = ?", [
				$col,

				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			])) {
				foreach ($this->db->query("SELECT name FROM ws_collections WHERE id = ? AND username = ?", [
					Clean::numbers($col),
					$this->clients->get_id() 
				]) as $data);

				echo json_encode([ 
					'return'		=>	'success',
					'collection'	=>	[
						'id'		=>	$col,
						'name'		=>	$data['name'],
					]
				]);
			} else {
				echo json_encode([ 'return' => 'error-change-collection-model' ]);
			}
		}

	}
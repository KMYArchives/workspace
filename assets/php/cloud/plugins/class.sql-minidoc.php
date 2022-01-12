<?php

	class SQLMiniDoc {

		private $db;

		private function term(): string {
			$term			=	$_GET['term'];
			$pattern		=	match($_GET['pattern']) {
				'like'		=>	"= '$term'",
				'%like'		=>	"LIKE '%$term'",
				'%like%'	=>	"LIKE '%$term%'",
				default		=>	"LIKE '%$term%'",
			};

			if ($term) {
				return "WHERE name $pattern";
			} else {
				return '';
			}
		}

		private function order(): string {
			return match($_GET['order']) {
				'name_asc'		=>	"ORDER BY name ASC",
				'name_desc'		=>	"ORDER BY name DESC",
				default			=>	"ORDER BY added_in ASC",
				'added_asc'		=>	"ORDER BY added_in ASC",
				'added_desc'	=>	"ORDER BY added_in DESC",
				'updated_asc'	=>	"ORDER BY updated_in ASC",
				'updated_desc'	=>	"ORDER BY updated_in DESC",
			};
		}

		public function get(): mixed {
			foreach ($this->db->query("SELECT slug, name, content, added_in, updated_in FROM ws_sql_minidoc WHERE slug = ? OR name = ?", [
				Clean::slug($_GET['slug']),
				$_GET['slug'],
			]) as $data);

			Headers::setHttpCode(200);
			Headers::setContentType('application/json');
			echo json_encode($data);
		}

		public function list(): mixed {
			$sql_max	=	Values::$assets['sql_max'];
			$where		=	$this->term() . " " . $this->order();
			$offset		=	($_GET['offset']) ? Clean::numbers($_GET['offset']) : 0;

			foreach ($this->db->query("SELECT slug, name FROM ws_sql_minidoc $where LIMIT $offset, $sql_max") as $data) {
				$list[]			=	[
					'slug'		=>	$data['slug'],
					'name'		=>	$data['name'],
				];
			}

			Headers::setHttpCode(200);
			Headers::setContentType('application/json');

			echo json_encode([
				'list'		=>	$list,
				'offset'	=>	intval($offset),
				'total'		=>	$this->db->query("SELECT COUNT(*) FROM ws_sql_minidoc $where")[0]['COUNT(*)'],
			]);
		}

		public function get_ref(string $value): mixed {
			foreach ($this->db->query("SELECT name, content, added_in, updated_in FROM ws_sql_minidoc WHERE slug = ?", [
				Clean::slug($_GET['slug']), 
			]) as $data);

			return $data[$value];
		}

		public function __construct() { $this->db = new DB; }

	}
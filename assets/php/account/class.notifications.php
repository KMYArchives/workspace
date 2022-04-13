<?php

	class Notifications {

		private $db, $clients, $models_meta, $hashes_meta, $diagrams_meta;

		private function _filter(): string {
			return match(
				Clean::string(
					$_GET['filter'], 'az'
				)
			) {
				default			=>	"AND opened = 'false'",
				'opened'		=>	"AND opened = 'false'",
				'closed'		=>	"AND opened = 'true'",
			};
		}

		private function _user_from(int|string $data = null): mixed {
			if ($data) {
				return [
					'name'			=>	$this->clients->get_data($data, 'name'),
					'username'		=>	$this->clients->get_data($data, 'username'),
					'avatar'		=>	$this->clients->get_data($data, 'gravatar_link'),
				];
			} else {
				return null;
			}
		}

		private function _get_item_data (int|string $data, string $type): mixed {
			return match ($type) {
				'model'			=>	[
					'type'		=>	$type,
					'slug'		=>	$this->models_meta->get_data($data, 'slug'),
					'name'		=>	$this->models_meta->get_data($data, 'name'),
				],
			};
		}

		public function get(): mixed {
			foreach ($this->db->query("SELECT slug, item, type, message, opened, user_from, added_in, updated_in, username FROM ws_notifications WHERE slug = ? AND username = ? $filter", [
				Clean::slug($_GET['slug']),
				$this->clients->get_id($_GET['username'])
			]) as $data);

			Callback::json(200, [
				'slug'			=>	$data['slug'],
				'opened'		=>	$data['opened'],
				'message'		=>	$data['message'],
				'added_in'		=>	$data['added_in'],
				'updated_in'	=>	$data['updated_in'],

				'owner'				=>	[
					'name'			=>	$this->clients->get_data($data['username'], 'name'),
					'username'		=>	$this->clients->get_data($data['username'], 'username'),
					'avatar'		=>	$this->clients->get_data($data['username'], 'gravatar_link'),
				],

				'user_from'		=>	$this->_user_from($data['user_from']),
				'item'			=>	$this->_get_item_data($data['item'], $data['type']),
			]);
		}

		public function list(): mixed {
			$filter		=	$this->_filter();
			$sql_max	=	Values::$assets['sql_max'];
			$username	=	$this->clients->get_id($_GET['username']);
			$offset		=	($_GET['offset']) ? Clean::numbers($_GET['offset']) : 0;

			foreach ($this->db->query("SELECT * FROM ws_notifications WHERE username = ? $filter LIMIT $offset, $sql_max", [
				$username
			]) as $data) {
				$list[]				=	[
					'slug'			=>	$data['slug'],
					'opened'		=>	$data['opened'],
					'added_in'		=>	$data['added_in'],
					'updated_in'	=>	$data['updated_in'],
					'from'			=>	$this->_user_from($data['user_from']),
					'item'			=>	$this->_get_item_data($data['item'], $data['type']),
					'owner'			=>	[
						'name'		=>	$this->clients->get_data($data['username'], 'name'),
						'username'	=>	$this->clients->get_data($data['username'], 'username'),
						'avatar'	=>	$this->clients->get_data($data['username'], 'gravatar_link'),
					]
				];
			}

			Callback::json(200, [
				'list'	=>	$list,

				'total'	=>	$this->db->query("SELECT COUNT(*) FROM ws_notifications WHERE username = ? $filter", [
					$username
				])[0]['COUNT(*)'],
			]);
		}

		public function __construct() {
			$this->db			=	new DB;
			$this->clients		=	new Clients;
			$this->models_meta	=	new ModelsMeta;
		}

		public function edit(): mixed {}

		public function delete(): mixed {}

		public function create(): mixed {}

	}
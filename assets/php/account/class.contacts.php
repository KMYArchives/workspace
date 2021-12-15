<?php

	class Contacts {

		private $db, $clients;

		private function filter() {
			switch (Clean::string($_GET['filter'], 'az')) {
				case 'all':
				case 'approved':
					return "AND invite_accept = 'true'"; 
					break;
					
				case 'pending':
					return "AND invite_accept = 'false'"; 
					break;

				case 'favorites':
					return "AND favorited = 'true'"; 
					break;

				default:
					return "AND invite_accept = 'true'";
					break;
			}
		}

		private function get_user_id($email) {
			$query	=	$this->db->query("SELECT id FROM ws_clients WHERE email = ?", [
				OpenSSL::encrypt($email)
			])[0];

			return $query['id'];
		}

		private function check_exists($email, $username) {
			$query	=	$this->db->query("SELECT id FROM ws_clients WHERE email = ?", [
				OpenSSL::encrypt($email)
			]);

			if ($query > 0) {
				if ($query[0]['id'] != Clean::numbers($username)) {
					return true;
				} else {
					return 'equal_user_logged';
				}
			} else {
				return false;
			}
		}

		public function get() {
			foreach ($this->db->query("SELECT * FROM ws_contacts WHERE slug = ? AND username = ?", [
				Clean::slug($_GET['slug']),
				$this->clients->get_id($_GET['username'])
			]) as $data) {
				$contact			=	[
					'slug'			=>	$data['slug'],
					'added_in'		=>	$data['added_in'],
					'updated_in'	=>	$data['updated_in'],
					'status'		=>	$data['invite_accept'],
					'name'			=>	$this->clients->get_data($data['id'], 'name'),
					'email'			=>	$this->clients->get_data($data['id'], 'email'),
					'gravatar'		=>	$this->clients->get_data($data['id'], 'gravatar'),
					'username'		=>	$this->clients->get_data($data['id'], 'username'),
				];
			}

			Headers::setContentType('application/json');
			echo json_encode($contact);
		}

		public function list() {
			$where		=	$this->filter();
			$sql_max	=	Values::$assets['sql_max'];
			$offset		=	($_GET['offset']) ? Clean::numbers($_GET['offset']) : 0;
			$username	=	($_GET['username']) ? Clean::numbers($_GET['username']) : $this->clients->get_id();

			foreach ($this->db->query("SELECT id, slug, favorited, contact_id, invite_accept, added_in FROM ws_contacts WHERE username = ?  AND contact_id != ? $where LIMIT $offset, $sql_max", [
				$username, $username,
			]) as $data) {
				$list[]				=	[
					'slug'			=>	$data['slug'],
					'added_in'		=>	$data['added_in'],
					'favorited'		=>	$data['favorited'],
					'status'		=>	$data['invite_accept'],
					'name'			=>	$this->clients->get_data($data['contact_id'], 'name'),
					'email'			=>	$this->clients->get_data($data['contact_id'], 'email'),
					'gravatar'		=>	$this->clients->get_data($data['contact_id'], 'gravatar'),
				];
			}

			Headers::setContentType('application/json');
			echo json_encode([
				'list'	=>	$list,
				'total'	=>	$this->db->query("SELECT count(*) FROM ws_contacts WHERE invite_accept = 'true' AND username = ? AND contact_id != ? $where LIMIT $offset, $sql_max", [
					$username, $username
				])[0]['count(*)']
			]);
		}

		public function update() {
			if (Clean::string($_POST['status'], 'az') == 'true') {
				if ($this->db->query("UPDATE ws_contacts SET invite_accept = ? WHERE slug = ? AND username = ?", [
					'true',

					Clean::slug($_POST['slug']),
					($_POST['username']) ? Clean::numbers($_POST['username']) : $this->clients->get_id(),
				])) {
					echo json_encode([ 'return' => 'success' ]);
				} else {
					echo json_encode([ 'return' => 'error-db-edited-contact' ]);
				}
			} else if (Clean::string($_POST['status'], 'az') == 'false') {
				$this->delete();
			}
		}

		public function create() {
			$username	=	$this->clients->get_id();
			if ($_POST['username']) { $username = Clean::numbers($_POST['username']); }

			if ($this->check_exists($_POST['contact'], $username)) {
				if ($this->db->query("INSERT INTO ws_cloud_share(slug, contact_id, username) VALUES(?, ?, ?)", [
					Random::string(36, true, true, true),
					$this->get_user_id($_POST['contact']),
	
					$username,
				])) {
					echo json_encode([ 'return'	=> 'success' ]);
				} else {
					echo json_encode([ 'return' => 'error-db-create-contact' ]);
				}
			} else {
				echo json_encode([ 'return' => 'error-exists-contact' ]);
			}
		}

		public function delete() {
			if ($this->db->query("DELETE FROM ws_contacts WHERE slug = ? AND username = ?", [
				Clean::slug($_POST['slug']),
				($_POST['username']) ? Clean::numbers($_POST['username']) : $this->clients->get_id(),
			])) {
				echo json_encode([ 'return' => 'success' ]);
			} else {
				echo json_encode([ 'return' => 'error-db-delete-contact' ]);
			}
		}

		public function favorite() {
			foreach ($this->db->query("SELECT slug, favorited, username FROM ws_contacts WHERE slug = ? AND username = ? LIMIT 1" , [ 
				Clean::slug($_POST['slug']), 
				$this->clients->get_id() 
			]) as $data);

			if ($data['favorited'] == 'true') {
				$favorited	=	'false';
			} else {
				$favorited	=	'true';
			}

			Headers::setContentType('application/json');
			if ($this->db->query("UPDATE ws_contacts SET favorited = ? WHERE slug = ? AND username = ?", [
				$favorited,
				$data['slug'],
				$data['username'],
			])) {
				echo json_encode([ 
					'return'	=>	'success',
					'favorited'	=>	$favorited
				]);
			} else {
				echo json_encode([ 'return' => 'error-favorite-contacts' ]);
			}
		}

		public function __construct() {
			$this->db		=	new DB;
			$this->clients	=	new Clients;
		}

	}
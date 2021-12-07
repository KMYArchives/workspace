<?php

	class Clients {

		private $db;

		public function details() {
			foreach ($this->db->query("SELECT name, email, gender, username, confirmed FROM ws_clients WHERE id = ?", [ 
				$this->get_id() 
			]) as $data) {
				$data['gravatar']	=	Gravatar::avatar($data['email']);
				$data['email']		=	OpenSSL::decrypt($data['email']);
				$data['username']	=	OpenSSL::decrypt($data['username']);
			}

			header('Content-type: application/json');
			echo json_encode($data);
		}

		public function get_user() {
			return Str::last_slice(
				OpenSSL::decrypt(
					Cookies::get('user')
				), '-'
			);
		}
		
		public function get_id($user = null) {
			foreach ($this->db->query("SELECT id FROM ws_clients WHERE user_id = ?", [
				($user) ? Clean::string($user, 'Az09') : $this->get_user()
			]) as $data);

			return $data['id'];
		}

		public function get_data($user, $field) {
			foreach ($this->db->query("SELECT * FROM ws_clients WHERE id = ?", [ 
				$user
			]) as $data) {
				$data['gravatar']	=	Gravatar::avatar($data['email']);
				$data['email']		=	OpenSSL::decrypt($data['email']);
				$data['username']	=	OpenSSL::decrypt($data['username']);
			}

			return $data[$field];
		}

		public function __construct() { $this->db = new DB(true); }

	}
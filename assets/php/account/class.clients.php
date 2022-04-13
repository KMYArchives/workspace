<?php

	class Clients {

		private $db;

		public function details(): string {
			foreach ($this->db->query("SELECT name, email, gender, username, confirmed FROM ws_clients WHERE id = ?", [ 
				$this->get_id() 
			]) as $data) {
				$data['gravatar_link']	=	Gravatar::get($data['email']);
				$data['gravatar']		=	Gravatar::avatar($data['email']);
				$data['email']			=	OpenSSL::decrypt($data['email']);
				$data['username']		=	OpenSSL::decrypt($data['username']);
			}

			Callback::json(200, $data);
		}

		public function get_user(): string {
			return Str::last_slice(
				OpenSSL::decrypt(
					Cookies::get('user')
				), '-'
			);
		}
		
		public function get_id(int|string $user = null): string {
			foreach ($this->db->query("SELECT id FROM ws_clients WHERE user_id = ?", [
				($user) ? Clean::slug($user) : $this->get_user()
			]) as $data);

			return $data['id'];
		}

		public function get_data(int $user, string $field): string {
			foreach ($this->db->query("SELECT * FROM ws_clients WHERE id = ?", [ 
				$user
			]) as $data) {
				$data['gravatar_link']	=	Gravatar::get($data['email']);
				$data['gravatar']		=	Gravatar::avatar($data['email']);
				$data['email']			=	OpenSSL::decrypt($data['email']);
				$data['username']		=	OpenSSL::decrypt($data['username']);
			}

			return $data[$field];
		}

		public function __construct() { $this->db = new DB(true); }

	}
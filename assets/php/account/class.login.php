<?php

	class Login {

		private $clients;

		public function sign_out() {
			Cookies::delete('user');

			header('Content-type: application/json');
			echo json_encode([ 'logoff' => true ]);
		}

		public function check_logged() {
			header('Content-type: application/json');
			
			if ($this->clients->get_id()) {
				echo json_encode([ 'logged' => true ]);
			} else {
				echo json_encode([ 'logged' => false ]);
			}
		}

		public function __construct() { $this->clients = new Clients; }

	}
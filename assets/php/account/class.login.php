<?php

	class Login {

		private $clients;

		public function sign_out() {
			Cookies::delete('user');

			Headers::setContentType('application/json');
			echo json_encode([ 'logoff' => true ]);
		}

		public function check_logged() {
			Headers::setContentType('application/json');
			
			if ($this->clients->get_id()) {
				echo json_encode([ 'logged' => true ]);
			} else {
				echo json_encode([ 'logged' => false ]);
			}
		}

		public function __construct() { $this->clients = new Clients; }

	}
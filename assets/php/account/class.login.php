<?php

	class Login {

		private $clients;

		public function sign_out() {
			Cookies::delete('user');
			Callback::json(200, [ 'logoff' => true ]);
		}

		public function check_logged() {
			if ($this->clients->get_id()) {
				Callback::json(200, [ 'logged' => true ]);
			} else {
				Callback::json(200, [ 'logged' => false ]);
			}
		}

		public function __construct() { $this->clients = new Clients; }

	}
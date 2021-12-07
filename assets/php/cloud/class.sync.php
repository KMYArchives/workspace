<?php

	class Sync {

		private $db, $clients, $notifications;

		public function get() {}

		public function create() {}

		public function delete() {}

		public function __construct() {
			$this->db		=	new DB;
			$this->clients	=	new Clients;	
		}

	}
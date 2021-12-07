<?php

	class History {

		private $db, $clients;

		public function get() {}

		public function list() {}

		public function delete() {}

		public function create() {}

		public function __construct() {
			$this->db		=	new DB;
			$this->clients	=	new Clients;
		}

	}
<?php

	class ModelsLinked {

		private $db, $clients;

		public function create() {}

		public function delete() {}

		public function __construct() {
			$this->db		=	new DB;
			$this->clients	=	new Clients;
		}

	}
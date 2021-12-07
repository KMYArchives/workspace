<?php

	class Stats {

		private $db, $clients;

		public function bytes() {}

		public function totals() {}

		public function __construct() {
			$this->db		=	new DB;
			$this->clients	=	new Clients;
		}

	}
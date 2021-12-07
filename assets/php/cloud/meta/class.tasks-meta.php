<?php

	class TasksMeta {

		private $db, $clients;
		
		public function __construct() {
			$this->db		=	new DB;
			$this->clients	=	new Clients;
		}
	
	}
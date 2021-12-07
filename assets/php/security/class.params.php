<?php

	class Params {

		private static function _build(string $key, array $value) {
			$var		=	match($value['mode']) {
				'get'	=>	$_GET[$key],
				'post'	=>	$_POST[$key],
			};

			$var_text	=	match($value['mode']) {
				'get'	=>	'$_GET[' . $key . ']',
				'post'	=>	'$_POST[' . $key . ']',
			};

			if ($value['required'] == true) {
				if (!isset($var)) {
					echo "Missing required parameter: $var_text \r\n";
					die;
				} else if (empty($var)) {
					echo "Empty required parameter: $var_text \r\n";
					die;
				}
				
				if (!self::filter($var, $value['filter'])) {
					echo "Invalid type parameter: $var_text: (filter: $value[filter]) \r\n";
					die;
				}
			}
		}

		private static function _php_filters(string $filter): string {
			return match($filter) {
				default		=>	false,
				'ip'		=>	FILTER_VALIDATE_IP,
				'int'		=>	FILTER_VALIDATE_INT,
				'url'		=>	FILTER_VALIDATE_URL,
				'mac'		=>	FILTER_VALIDATE_MAC,
				'float'		=>	FILTER_VALIDATE_FLOAT,
				'email'		=>	FILTER_VALIDATE_EMAIL,
				'regex'		=>	FILTER_VALIDATE_REGEXP,
				'domain'	=>	FILTER_VALIDATE_DOMAIN,
				'boolean'	=>	FILTER_VALIDATE_BOOLEAN,
			};
		}

		private static function _custom_filters(string $filter): string {
			return match($filter) {
				default		=>	false,
				'string',	=>	"/^[A-Za-z0-9]+$/",
				'hash'		=>	"/[A-Za-z0-9]{8,128}/",
				'hashtag'	=>	"/#[A-Za-z0-9\-.\_]+(?:$)/",
				'uuid'		=>	"/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/",
				'base64'	=>	"/^[-A-Za-z0-9+=]{1,50}|=[^=]|={3,}/",
				'color'		=>	"/((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6}|[0-9a-f]{8}|[0-9a-f]{6})/",
				'hostname'	=>	"/(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/",
				'datetime'	=>	"/^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/",
			};
		}

		public static function filter(string $data, string $filter): bool {
			$php_filters	=	self::_php_filters($filter);

			if ($php_filters == false) {
				$custom	=	self::_custom_filters($filter);

				if ($custom == false) { return false; }
				if (!preg_match($custom, $data)) { return false; }
			} else {
				if (!filter_var(
					$data, self::_php_filters($filter)
				)) {
					return false;
				}
			}

			return true;
		}

		public static function request(array $params): mixed {
			foreach ($params as $key => $value) {
				self::_build($key, $value);
			}
		}

	}
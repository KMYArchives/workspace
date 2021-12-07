<?php

	class Gravatar {

		public static function avatar(string $email): string {
			return md5(
				OpenSSL::decrypt($email)
			);
		}

		public static function getURL(string $email, int $size = null): string {
			return sprintf(
				'https://www.gravatar.com/avatar/%s?s=%s',
				self::avatar($email),
				$size ?? 300
			);
		}

	}
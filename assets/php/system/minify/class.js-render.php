<?php

	require_once 'class.render-loader.php';

	class jsRender extends RenderLoader {
		
		private static function _engine(mixed $input) {
			$input	=	preg_replace('/^\s*[\r\n]/m', '', $input);
			$input	=	preg_replace('/^\s*[\r\n]/m', '', $input);
			$input	=	preg_replace('/[\r\n]+/', '', $input);
			$input	=	preg_replace('/\s+/', ' ', $input);
			$input	=	preg_replace('/^\s+/m', '', $input);
			$input	=	preg_replace('/\t+/', '', $input);
			$input	=	preg_replace('/;\s*$/', '', $input);

			return $input;
		}

		private static function _reader(string $file) {
			if (file_exists($file)) {
				return file_get_contents($file);
			} else {
				return null;
			}
		}

		public static function run(string $index, array $files) {
			foreach ($files as $file) {
				$js	.=	self::_reader($file);
			}

			$js		.=	self::_reader($index);
			$js		=	self::_engine($js);

			parent::_compress('application/javascript');
			return $js;
		}

	}
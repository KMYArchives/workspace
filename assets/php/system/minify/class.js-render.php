<?php

	require_once 'class.render-loader.php';

	class jsRender extends RenderLoader {
		
		private static function _engine(mixed $input) {
			# regex for remove blank lines
			$input	=	preg_replace('/^\s*[\r\n]/m', '', $input);

			# regex for remove break lines
			$input	=	preg_replace('/[\r\n]+/', '', $input);

			# regex for remove multiples spaces
			$input	=	preg_replace('/\s+/', ' ', $input);

			# regex for remove spaces at the begining of the line
			$input	=	preg_replace('/^\s+/m', '', $input);

			# regex for remove multiples tabs
			$input	=	preg_replace('/\t+/', '', $input);

			# regex for remove last semicolon
			$input	=	preg_replace('/;\s*$/', '', $input);

			# return the result
			return $input;
		}

		public static function run(string $index, array $files) {
			foreach ($files as $file) {
				$js	.=	file_get_contents($file);
			}

			$js		.=	file_get_contents($index);
			$js		=	self::_engine($js);

			parent::_compress('application/javascript');
			return $js;
		}

	}
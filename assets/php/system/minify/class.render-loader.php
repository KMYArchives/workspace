<?php

	require_once 'class.cdn.php';

	class RenderLoader extends CDN {

		protected static function _compress($mime) {
			ob_start('ob_gzhandler');

			Headers::set('Pragma', 'public');
			Headers::set('Vary', 'Accept-Encoding');
			Headers::set('Content-Encoding', 'gzip');
			Headers::set('Content-Encoding', 'deflate');
			Headers::set('Content-Type', "$mime; charset=UTF-8");
			Headers::set('Last-Modified', gmdate('D, d M Y H:i:s') . ' GMT');
			Headers::set('Cache-Control', 'max-age=31556926, must-revalidate');
			Headers::set('Expires: ', gmdate('D, d M Y H:i:s', time() + 31556926));
		}

		public static function render() {
			echo file_get_contents(
				'assets/js/render.json'
			);
		}
		
	}
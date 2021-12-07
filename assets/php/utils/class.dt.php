<?php

	class DT {

		public static function diff(string $date, string $period): string {
			$DTx	=	new DateTime;
			$diff	=	$DTx->diff(
				new DateTime($date)
			);

			return match($period) {
				'hours'		=>	$diff->h . ' hours',
				'years'		=>	$diff->y . ' years',
				'days'		=>	$diff->days . ' days',
				'months'	=>	$diff->m . ' months',
				'minutes'	=>	$diff->i . ' minutes',
				'seconds'	=>	$diff->s . ' seconds',
			};
		}

		public static function next_date(string $date, string $params = 'year'): string {
			if ($date == 'today') { $date = date($params['format']); }
			if (!$params['format']) { $params['format'] = 'Y-m-d H:i:s'; }

			$next_date	=	match($period) {
				'day'		=>	strtotime($date . ' +1 day'),
				'week'		=>	strtotime($date . ' +7 days'),
				'hour'		=>	strtotime($date . ' +1 hour'),
				'year'		=>	strtotime($date . ' +1 year'),
				'month'		=>	strtotime($date . ' +1 month'),
				'minute'	=>	strtotime($date . ' +1 minute'),
				'second'	=>	strtotime($date . ' +1 second'),
				'custom'	=>	strtotime($date . ' + ' . $params['custom']),
			};	

			return date(
				$params['format'], $next_date[
					$params['period']
				]
			);
		}

	}
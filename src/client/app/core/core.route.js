( function () {
	'use strict';

	/* @ngInject */
	function appRun( routerHelper, $rootScope, $window, $auth ) {
		var otherwise = '/404';
		routerHelper.configureStates(getStates(), otherwise);
		if ( $auth.isAuthenticated() ) {
			$rootScope.currentUser = JSON.parse( $window.localStorage.currentUser );
		}
	}

	function getStates() {
		return [
			{
				state: '404',
				config: {
					url: '/404',
					templateUrl: 'app/core/404.html',
					title: '404'
				}
			}
		];
	}
	angular
		.module( 'app.core' )
		.run( appRun );
} ) ();

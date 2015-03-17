(function() {
	'use strict';

	function getStates() {
		return [
			{
				state: 'login',
				config: {
					url: '/login',
					templateUrl: 'app/login/login.html',
					controller: 'LoginController',
					controllerAs: 'login',
					title: 'login'
				}
			}
		];
	}

	/* @ngInject */
	function appRun( routerHelper ) {
		routerHelper.configureStates(getStates());
	}

	angular
		.module( 'app.login' )
		.run( appRun );
})();
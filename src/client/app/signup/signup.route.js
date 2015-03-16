(function() {
	'use strict';

	function getStates() {
		return [
			{
				state: 'signup',
				config: {
					url: '/signup',
					templateUrl: 'app/signup/signup.html',
					controller: 'SignupController',
					controllerAs: 'signup',
					title: 'signup'
				}
			}
		];
	}

	/* @ngInject */
	function appRun( routerHelper ) {
		routerHelper.configureStates(getStates());
	}

	angular
		.module( 'app.signup' )
		.run( appRun );
})();

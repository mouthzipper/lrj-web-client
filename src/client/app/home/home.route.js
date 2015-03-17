(function() {
	'use strict';

	function getStates() {
		return [
			{
				state: 'home',
				config: {
					url: '/',
					templateUrl: 'app/home/home.html',
					controller: 'HomeController',
					controllerAs: 'home',
					title: 'home'
				}
			}
		];
	}

	/* @ngInject */
	function appRun( routerHelper ) {
		routerHelper.configureStates( getStates() );

	}

	angular
		.module('app.home')
		.run( appRun );

})();

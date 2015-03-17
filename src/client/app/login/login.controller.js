( function () {
	'use strict';

	/* @ngInject */
	function LoginController( $q, logger, $auth, $window, $rootScope ) {
		var self    = this;
		self.user   = {};
		self.title  = 'Login';
		self.login  = login;

		function login() {
			$auth.login({ username: self.user.username, password: self.user.password })
				.then( function( response ) {
				$window.localStorage.currentUser = JSON.stringify( response.data.user );
				$rootScope.currentUser = JSON.parse( $window.localStorage.currentUser );
			})
			.catch(function(response) {
				self.errorMessage = {};
				logger.error( response.data.message );
			});
		}
		logger.info( 'Activated' );
	}


	angular
		.module( 'app.login' )
		.controller( 'LoginController', LoginController );

} ) ();

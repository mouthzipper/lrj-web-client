( function () {
	'use strict';

	/* @ngInject */
	function LoginController( $q, UserService, logger, store, $state) {
		var self    = this;
		self.user   = {};
		self.title  = 'Login';
		self.login  = login;
		self.logout = logout;

		function login() {
			UserService.login( self.user )
				.then( function( data ) {
					$state.go('dashboard');
				} );
		}
		logger.info( 'Activated' );

		function logout() {
			UserService.logout();
			self.user = null;
		}
	}


	angular
		.module( 'app.login' )
		.controller( 'LoginController', LoginController );

} ) ();

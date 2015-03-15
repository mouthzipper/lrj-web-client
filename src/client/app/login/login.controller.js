( function () {
	'use strict';

	/* @ngInject */
	function LoginController( $q, dataservice, logger, store, $state) {
		var self   = this;
		self.user  = {};
		self.title = 'Login';
		self.login = login;

		function login() {
			dataservice.loginUser( self.user )
				.then( function( data ) {
					store.set( 'jwt', data );
					$state.go('dashboard');
				} );
		}
		logger.info( 'Activated' );
	}


	angular
		.module( 'app.login' )
		.controller( 'LoginController', LoginController );

} ) ();

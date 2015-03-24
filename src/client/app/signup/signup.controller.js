( function () {
	'use strict';

	/* @ngInject */
	function SignupController( $q, logger, $auth, $state, $rootScope, $window ) {
		var self   = this;
		self.user  = {};
		self.title = 'Signup';
		logger.info( 'Activated Signup' );
		self.signup = signup;

		function signup() {
			$auth.signup( {
				username  : self.user.username,
				email     : self.user.email,
				firstName : self.user.firstname,
				lastName  : self.user.lastName,
				password  : self.user.password
			} ).then( function ( response ) {
				$window.localStorage.currentUser = JSON.stringify( response.data.user );
				$rootScope.currentUser = JSON.parse( $window.localStorage.currentUser );
			} );
		}
	}


	angular
		.module( 'app.signup' )
		.controller( 'SignupController', SignupController );

} ) ();

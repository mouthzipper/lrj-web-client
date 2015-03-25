( function () {
	'use strict';

	/* @ngInject */
	function LoginController( $q, logger, $auth, $window, $rootScope, $alert ) {
		var self    = this;
		self.user   = {};
		self.title  = 'Login';
		self.login  = login;
		self.authenticate = authenticate;

		logger.info( 'Activated' );

		function login() {
			$auth.login({ email: self.user.email, password: self.user.password })
				.then( function( response ) {
				$window.localStorage.currentUser = JSON.stringify( response.data.user );
				$rootScope.currentUser = JSON.parse( $window.localStorage.currentUser );
			})
			.catch(function( response ) {
				self.errorMessage = {};
				self.loginForm = {};
	          	angular.forEach(response.data.message, function (message, field ) {
	            	self.loginForm[field].$setValidity( 'server', false);
	            	self.errorMessage[field] = response.data.message[field];
	          });
			});
		}

		function authenticate( provider ) {
			$auth.authenticate(provider)
				.then(function( response ) {
					logger.success( 'You have successfully logged in' );
				})
				.catch( function(response ) {
					logger.error( 'Failed')
			});
		}
	}


	angular
		.module( 'app.login' )
		.controller( 'LoginController', LoginController );

} ) ();

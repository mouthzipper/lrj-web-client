( function () {
	'use strict';

	/* @ngInject */
	function LayoutController( $rootScope, $timeout, config, logger, $window, $auth, $alert ) {
		var self = this;

		activate();
		self.isAuthenticated = isAuthenticated;
		self.logout = logout;

		function isAuthenticated() {
			return $auth.isAuthenticated();
		}
		function activate() {
			logger.success( config.appTitle + ' loaded!', null );
		}
		function logout () {
			$auth.logout()
				.then(function() {
					logger.success( 'Succesfully logout.' );
				} );
			delete $window.localStorage.currentUser;
		}
	}

	angular
		.module('app.layout')
		.controller('LayoutController', LayoutController);


} ) ();

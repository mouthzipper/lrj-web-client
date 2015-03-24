( function () {
	'use strict';

	/* @ngInject */
	function HomeController( $q, PostService, logger, $window, $rootScope, $auth  ) {
		var self = this;

		self.posts           = [];
		self.title           = 'Dashboard';
		self.isAuthenticated = isAuthenticated;

		if ( $auth.isAuthenticated() && ( $rootScope.currentUser && $rootScope.currentUser.username ) ) {
			loadData();
		}
		function isAuthenticated() {
			return $auth.isAuthenticated();
		}

		function loadData () {
			PostService.getPosts().then( function ( data ) {
				self.posts = data;
				return self.posts;
			} );
		}
	}


	angular
		.module( 'app.home' )
		.controller( 'HomeController', HomeController );

} ) ();

( function () {
	'use strict';

	/* @ngInject */
	function DashboardController( $q, PostService, logger, UserService  ) {
		var self = this;

		self.posts = [];
		self.title  = 'Dashboard';
		self.logout = logout;
		loadData();
		function loadData () {
			PostService.getPosts().then( function ( data ) {
				self.posts = data;
				return self.posts;
			} );
		}


		function logout() {
			UserService.logout();
		}
	}


	angular
		.module( 'app.dashboard' )
		.controller( 'DashboardController', DashboardController );

} ) ();

( function () {
	'use strict';

	/* @ngInject */
	function DashboardController( $q, PostService, logger ) {
		var self = this;

		self.posts = [];
		self.title  = 'Dashboard';

		activate();

		function activate() {
			var promises = [ getPosts() ];
			return $q.all( promises ).then( function () {
				logger.info( 'Activated Dashboard View' );
			} );
		}

		function getPosts() {
			return PostService.getPosts().then( function ( data ) {
				self.posts = data;
				return self.posts;
			} );
		}
	}


	angular
		.module( 'app.dashboard' )
		.controller( 'DashboardController', DashboardController );

} ) ();

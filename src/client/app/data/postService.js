( function () {
	'use strict';

	/* @ngInject */
	function PostService( $http, $q, logger, AuthTokenFactory, $state ) {
		var service = {
			getPosts  : getPosts
		};

		return service;

		function getPosts() {
			if ( AuthTokenFactory.getToken() ) {
				return $http.get( '/api/posts' )
				.then( function ( response ) {
					return response.data;
				})
				.catch( errorHandler );

			} else {
				$state.go( 'login' );
			}
		}

		function errorHandler( error ) {
			var msg = 'query for posts failed. ' + error.data.description;
			logger.error( msg) ;
			return $q.reject(msg);
		}
	}

	angular
		.module( 'app.data' )
		.factory( 'PostService', PostService );

} ) ();

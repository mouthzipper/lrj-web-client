( function () {
	'use strict';

	/* @ngInject */
	function PostService( $http, $q, logger, $state, API_URL ) {
		var service = {
			getPosts  : getPosts
		};

		return service;

		function getPosts() {
			return $http.get( API_URL + '/posts' )
			.then( function( response ) {
				return response.data;
			})
			.catch( errorHandler );
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

( function () {
	'use strict';

	/* @ngInject */
	function dataservice( $http, $q, logger ) {
		var service = {
			getPosts : getPosts
		};

		return service;

		function getPosts() {
			return $http.get( '/api/posts' )
				.then(success)
				.catch(fail);

			function success( response ) {
				return response.data;
			}

			function fail( error ) {
				var msg = 'query for posts failed. ' + error.data.description;
				logger.error( msg) ;
				return $q.reject(msg);
			}
		}
	}

	angular
		.module( 'app.core' )
		.factory( 'dataservice', dataservice );

} ) ();

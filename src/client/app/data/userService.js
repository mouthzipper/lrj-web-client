( function () {
	'use strict';

	/* @ngInject */
	function UserService( $http, $q, logger ) {
		var service = {
			loginUser : loginUser
		};

		return service;

		function loginUser( user ) {
			return $http.post( 'http://localhost:3000/users/login', user )
				.then(success)
				.catch(fail);

			function success( response ) {
				return response.data;
			}

			function fail( error ) {
				var msg = 'Login Failed';
				logger.error( msg) ;
				return $q.reject(msg);
			}
		}
	}

	angular
		.module( 'app.data' )
		.factory( 'UserService', UserService );

} ) ();

( function () {
	'use strict';

	/* @ngInject */
	function UserService( $http, $q, logger, API_URL, AuthTokenFactory ) {

		var service = {
			login   : login,
			logout  : logout,
			getUser : getUser
		};

		return service;

		function login( user ) {
			return $http.post( API_URL +'/users/login', user )
				.then( function ( response ) {
					AuthTokenFactory.setToken( response.data );
					return response.data;
				} )
				.catch( function ( error ) {
					var msg = 'Login Failed';
					logger.error( msg) ;
					return $q.reject(msg);
				} );
		}

		function logout() {
			AuthTokenFactory.setToken();
		}

		function getUser() {
			if ( AuthTokenFactory.getToken()) {
				return $http.get( API_URL + '/me' );
			} else {
				return $q.reject({ data: 'client has no auth token' });
			}
		}
	}

	angular
		.module( 'app.data' )
		.factory( 'UserService', UserService );

} ) ();

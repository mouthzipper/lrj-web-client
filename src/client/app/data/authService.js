( function  () {
	'use strict';
	/* @ngInject */
	function AuthTokenFactory( $window ) {

		var store = $window.localStorage;
		var key = 'auth-token';

		return {
			getToken: getToken,
			setToken: setToken
		};

		function getToken() {
			return store.getItem(key);
		}

		function setToken( token ) {
			if (token) {
				store.setItem(key, token);
			} else {
				store.removeItem(key);
			}
		}
	}

	function AuthInterceptor( AuthTokenFactory ) {

		return {
			request : addToken
		};

		function addToken( config ) {
			var token = AuthTokenFactory.getToken();
			if (token) {
				config.headers = config.headers || {};
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		}
	}

	angular
		.module( 'app.data' )
		.factory( 'AuthTokenFactory', AuthTokenFactory)
		.factory( 'AuthInterceptor', AuthInterceptor );
})();
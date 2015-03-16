( function () {
	'use strict';

	angular
		.module( 'app.data', [ 'app.core' ],  function config( $httpProvider ) {
			$httpProvider.interceptors.push( 'AuthInterceptor' );
		} )
		.constant('API_URL', 'http://localhost:3000');
})();
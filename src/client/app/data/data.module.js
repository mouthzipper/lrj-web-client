( function () {
	'use strict';

	angular
		.module( 'app.data', [ 'app.core' ] )
		.constant('API_URL', 'http://localhost:3000');
})();
(function() {
	'use strict';

	angular.module('blocks.router', [
		'ui.router',
		'blocks.logger',
		'satellizer'
	])
	.constant('API_URL', 'http://localhost:3000');
})();

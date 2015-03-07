( function () {
	'use strict';

	/* @ngInject */
	function LayoutController( $rootScope, $timeout, config, logger ) {
		var self              = this;
		self.busyMessage      = 'Please wait ...';
		self.isBusy           = true;
		$rootScope.showSplash = true;

		self.navline = {
			title: config.appTitle
		};

		activate();

		function activate() {
			logger.success( config.appTitle + ' loaded!', null );
			hideSplash();
		}

		function hideSplash() {
			//Force a 1 second delay so we can see the splash.
			$timeout( function() {
				$rootScope.showSplash = false;
			}, 1000 );
		}
	}

	angular
		.module('app.layout')
		.controller('LayoutController', LayoutController);

} ) ();

/* Help configure the state-base ui.router */
(function() {
	'use strict';

	/* @ngInject */
	function routerHelperProvider( $locationProvider, $stateProvider, $urlRouterProvider, $authProvider, API_URL ) {
		/* jshint validthis:true */
		var config = {
			docTitle: undefined,
			resolveAlways: {}
		};
		// satellizer configuration
		$authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
		// $authProvider.loginOnSignup = true;
		$authProvider.loginRedirect = '/';
		$authProvider.logoutRedirect = '/';
		$authProvider.signupRedirect = '/login';
		$authProvider.loginUrl = API_URL + '/auth/login';
		$authProvider.signupUrl = API_URL + '/auth/signup';
		$authProvider.loginRoute = API_URL + '/login';
		$authProvider.signupRoute = API_URL + '/signup';
		// $authProvider.tokenRoot = false; // set the token parent element if the token is not the JSON root
		// $authProvider.tokenName = 'token';
		$authProvider.tokenPrefix = 'satellizer'; // Local Storage name prefix
		$authProvider.unlinkUrl = API_URL + '/auth/unlink/';
		// $authProvider.unlinkMethod = 'get';
		$authProvider.authHeader = 'Authorization';
		$authProvider.withCredentials = true; // Send POST request with credentials
		//  $authProvider.google({
		// 	url: API_URL + '/auth/google'
		// });
		// $authProvider.google({
		// 	clientId: '945688844981-50u0blqspursnv1sls6askg8r3np6hp7.apps.googleusercontent.com'
		// });
		// OAuth 2.0
		$authProvider.oauth2({
		  url: null,
		  name: null,
		  scope: null,
		  scopeDelimiter: null,
		  clientId: null,
		  redirectUri: null,
		  popupOptions: null,
		  authorizationEndpoint: null,
		  responseParams: null,
		  requiredUrlParams: null,
		  optionalUrlParams: null,
		  defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
		  responseType: 'code'
		});

		// Google
		$authProvider.google({
			url: API_URL + '/auth/google',
			clientId: '945688844981-50u0blqspursnv1sls6askg8r3np6hp7.apps.googleusercontent.com',
			authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
			redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
			scope: ['profile', 'email'],
			scopePrefix: 'openid',
			scopeDelimiter: ' ',
			requiredUrlParams: ['scope'],
			optionalUrlParams: ['display'],
			display: 'popup',
			type: '2.0',
			popupOptions: { width: 580, height: 400 }
		});

		$locationProvider.html5Mode(true);

		this.configure = function(cfg) {
			angular.extend(config, cfg);
		};

		this.$get = RouterHelper;
		RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger'];
		/* @ngInject */
		function RouterHelper($location, $rootScope, $state, logger) {
			var handlingStateChangeError = false;
			var hasOtherwise = false;
			var stateCounts = {
				errors: 0,
				changes: 0
			};

			var service = {
				configureStates: configureStates,
				getStates: getStates,
				stateCounts: stateCounts
			};

			init();

			return service;

			///////////////

			function configureStates( states, otherwisePath ) {
				states.forEach(function(state) {
					state.config.resolve =
						angular.extend(state.config.resolve || {}, config.resolveAlways);
					$stateProvider.state(state.state, state.config);
				});
				if (otherwisePath && !hasOtherwise) {
					hasOtherwise = true;
					$urlRouterProvider.otherwise(otherwisePath);
				}
			}

			function handleRoutingErrors() {
				// Route cancellation:
				// On routing error, go to the dashboard.
				// Provide an exit clause if it tries to do it twice.
				$rootScope.$on('$stateChangeError',
					function(event, toState, toParams, fromState, fromParams, error) {
						if (handlingStateChangeError) {
							return;
						}
						stateCounts.errors++;
						handlingStateChangeError = true;
						var destination = (toState &&
							(toState.title || toState.name || toState.loadedTemplateUrl)) ||
							'unknown target';
						var msg = 'Error routing to ' + destination + '. ' +
							(error.data || '') + '. <br/>' + (error.statusText || '') +
							': ' + (error.status || '');
						logger.warning(msg, [toState]);
						$location.path('/');
					}
				);
			}

			function init() {
				handleRoutingErrors();
				updateDocTitle();
			}

			function getStates() {
				return $state.get();
			}

			function updateDocTitle() {
				$rootScope.$on('$stateChangeSuccess',
					function(event, toState, toParams, fromState, fromParams) {
						stateCounts.changes++;
						handlingStateChangeError = false;
						var title = config.docTitle + ' ' + (toState.title || '');
						$rootScope.title = title; // data bind to <title>
					}
				);
			}
		}
	}

	angular
		.module( 'blocks.router' )
		.provider( 'routerHelper', routerHelperProvider );
} ) ( angular );

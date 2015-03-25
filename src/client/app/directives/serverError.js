(function () {
	'use strict';
	function serverError() {
	    return {
	        restrict: 'A',
	        require: 'ngModel',
	        link: function( scope, element, attrs, ctrl ) {
	          element.on('keydown', function() {
	            ctrl.$setValidity('server', true)
	          });
	        }
	    }
  	} 
	angular
		.module('app.directive' )
		.directive( 'serverError', serverError );
})();

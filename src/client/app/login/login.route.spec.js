/* jshint -W117, -W030 */
describe('login routes', function () {
	describe('state', function () {
		var controller;
		var view = 'app/login/login.html';

		beforeEach(function() {
			module('app.login', bard.fakeToastr);
			bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
		});

		beforeEach(function() {
			$templateCache.put(view, '');
		});

		bard.verifyNoOutstandingHttpRequests();

		it('should map state login to url / ', function() {
			expect($state.href('login', {})).to.equal('/');
		});

		it('of login should work with $state.go', function () {
			$state.go('login');
			$rootScope.$apply();
			expect($state.is('login'));
		});
	});
});

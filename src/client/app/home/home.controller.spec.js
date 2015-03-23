/* jshint -W117, -W030 */
describe( 'DashboardController', function() {
	var controller;
	var posts = mockData.getMockPosts;

	beforeEach(function() {
		bard.appModule('app.dashboard');
		bard.inject('$controller', '$log', '$q', '$rootScope', 'PostService');
	});

	beforeEach(function () {
		sinon.stub(PostService, 'getPosts').returns($q.when(posts));
		controller = $controller('DashboardController');
		$rootScope.$apply();
	});

	bard.verifyNoOutstandingHttpRequests();

	describe('Dashboard controller', function() {
		it('should be created successfully', function () {
			expect(controller).to.be.defined;
		});

		describe('after activate', function() {
			it('should have title of Dashboard', function () {
				expect(controller.title).to.equal('Dashboard');
			});

			it('should have logged "Activated"', function() {
				expect($log.info.logs).to.match(/Activated/);
			});

		});
	});
});

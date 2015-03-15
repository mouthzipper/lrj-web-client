/* jshint -W079 */
var mockData = (function() {
	return {
		getMockPosts: getMockPosts,
		getMockStates: getMockStates,
		getMockData : getMockData
	};

	function getMockStates() {
		return [
			{
				state: 'dashboard',
				config: {
					url: '/',
					templateUrl: 'app/dashboard/dashboard.html',
					title: 'dashboard'
				}
			}
		];
	}

	function getMockPosts() {
		return [
			{id: 1, name: 'this is a video', details: 'test', category: 'video', date: '10/01/2014'},
			{id: 2, name: 'this is an images', details: 'test', category: 'image', date: '10/01/2014'},
			{id: 3, name: 'this is an images', details: 'test', category: 'image', date: '10/01/2014'},
			{id: 4, name: 'this is an images', details: 'test', category: 'image', date: '10/01/2014'}
		];
	}
	function getMockData(){
		return {
			'token' : 'testtoken'
		};
	}
})();

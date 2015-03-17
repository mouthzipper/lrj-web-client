module.exports = {
		posts: getPosts()
};

function getPosts() {
	return [
		{id: 1, name: 'this is a video', details: 'test', category: 'video', date: '10/01/2014'},
		{id: 2, name: 'image here', details: 'details', category: 'image', date: '10/01/2014'},
		{id: 3, name: 'image here', details: 'details', category: 'image', date: '10/01/2014'},
		{id: 4, name: 'image here', details: 'details', category: 'image', date: '10/01/2014'},
		{id: 5, name: 'image here', details: 'details', category: 'image', date: '10/01/2014'},
		{id: 6, name: 'image here', details: 'details', category: 'image', date: '10/01/2014'}
		];
}

var router    = require('express').Router();
var four0four = require('./utils/404')();
var data      = require('./data');

router.get('/posts', getPosts);
router.get('/post/:id', getPost);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

function getPosts(req, res, next) {
	res.status(200).send(data.posts);
}

function getPost(req, res, next) {
	var id = +req.params.id;
	var post = data.posts.filter(function(p) {
		return p.id === id;
	})[0];

	if ( post ) {
		res.status(200).send( post );
	} else {
		four0four.send404(req, res, 'post ' + id + ' not found');
	}
}

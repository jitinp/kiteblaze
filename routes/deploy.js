var express = require('express');
var router = express.Router();


module.exports = function(io) {

	/* GET about page. */
	router.get('/', function(req, res, next) {
		console.log(io, "Hey.. socket.io.. " + io);

		// code to test IO
		io.emit("logs", "crawling in my skin.. ");

		res.render('deploy', { title: 'Kiteblaze | Deploy apps automatically', page: 'about' });
		return;
	});

	router.post('/code', function(req, res, next) {
		console.log("Git repo link: " + req.body.repolink);

		// Decide name for GIT repo Directory if doesn't exist

		// Store Directory name in DB

		// Create Directory

		// Pull code

		// Confirm if pulled successfully

		// Verify Git pull

		// If all good push message to Screen Flash

		// Enable Next button

		return;
	})

	return router;
}


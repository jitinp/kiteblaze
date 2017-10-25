var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('deploy', { title: 'Kiteblaze | Deploy apps automatically', page: 'about' });
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

module.exports = router;

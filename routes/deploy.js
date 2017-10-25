var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('deploy', { title: 'Kiteblaze | Deploy apps automatically', page: 'about' });
});

router.post('/code', function(req, res, next) {
	console.log("Git repo link: " + req.body.repolink);
	return;
})

module.exports = router;

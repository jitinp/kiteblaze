var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'Kiteblaze | About', page: 'about' });
});

module.exports = router;

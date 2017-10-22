var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'Kiteblaze | Deploy apps automatically', page: 'about' });
});

module.exports = router;

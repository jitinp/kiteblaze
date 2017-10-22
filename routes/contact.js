var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Kiteblaze | Contact', page: 'contact' });
});

module.exports = router;

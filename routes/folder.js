var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('folderTest', { title: 'Folder Testing', page: 'index' });
});


module.exports = router;

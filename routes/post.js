var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/post', function(req, res, next) {
  res.render('index', { title: 'Post' });
});

module.exports = router; 

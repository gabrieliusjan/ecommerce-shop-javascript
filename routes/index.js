var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/shop', function(req, res, next) {
  res.render('shop', { title: 'Shop' });
});

router.get('/cart', function(req, res, next) {
  res.render('index', { title: 'Cart' });
});

router.get('/orders', function(req, res, next) {
  res.render('orders', { title: 'Orders' });
});

router.get('/orders', function(req, res) {
  req.getConnection(function(error, conn) {
    conn.query('SELECT * FROM `user` ORDER BY user_id DESC',function(err, rows, fields) {
      if (err) {
        res.send('err');
      } 
      else {
        res.render('orders', {title: 'Current Registered Users: ', rowData: rows});
      }
    })
  })
})

router.get('/orders', function(req, res) {
  req.getConnection(function(error, conn) {
    conn.query('SELECT * FROM `order` ORDER BY order_id DESC',function(err, rows, fields) {
      if (err) {
        res.send('err');
      } 
      else {
        res.render('orders', {title: 'Current Registered Users: ', rowData: rows});
      }
    })
  })
})

module.exports = router;

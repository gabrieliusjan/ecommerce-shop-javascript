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
      conn.query('SELECT * FROM products ORDER BY product_id DESC',function(err, rows, fields) {
          //if(err) throw err
          if (err) {
              res.send("err");
          } else {
              console.log(rows);
              res.render('orders', {title: 'Ordered Products: ', rowData: rows});
          }
      })
  })
});

module.exports = router;

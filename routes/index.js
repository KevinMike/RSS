var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/rss', function(req, res, next) {
    res.render('rss', { title: 'Rss - Feeder' });
});
router.get('/phrases', function(req, res, next) {
    res.render('phrases', { title: 'Frases de seguridad' });
});
router.get('/comunicates', function(req, res, next) {
    res.render('comunicates', { title: 'Comunicados' });
});
router.get('/indicators', function(req, res, next) {
    res.render('indicators', { title: 'Tags' });
});


module.exports = router;

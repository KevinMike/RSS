var express = require('express');
var router = express.Router();
const Feed = require('feed');
var reader = require('../helpers/readStream');
var fs = require('fs');
router.get('/', function(req, res, next) {
    var feed = new Feed({
        title: 'Southern Peru Cooper Corporation',
        description: 'Indicadores de producción de cobre',
        favicon: 'http://example.com/favicon.ico',
        copyright: 'All rights reserved',
        updated: new Date(2013, 6, 14), // optional, default = today
        author: {
            name: 'Kevin Herrera',
            email: 'ibecti@southernperu.com.pe',
        }
    });
    var input = fs.createReadStream('../RSS/public/frases.txt');
    reader(input)
        .then(data=>res.send(data))
    feed.addItem({
        title: 'title',
        description: 'description',
        content: 'content',
    });
    res.set('Content-Type', 'text/xml');
    res.send(feed.rss2());
});

router.get('/phrases',function(req,res,next){


});
module.exports = router;

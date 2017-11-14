var express = require('express');
var router = express.Router();
const Feed = require('feed');

router.get('/', function(req, res, next) {
    var feed = new Feed({
        title: 'Southern Peru Cooper Corporation',
        description: 'Indicadores de producción de cobre',
        id: 'http://example.com/',
        link: 'http://example.com/',
        image: 'http://example.com/image.png',
        favicon: 'http://example.com/favicon.ico',
        copyright: 'All rights reserved',
        updated: new Date(2013, 06, 14), // optional, default = today
        generator: 'awesome', // optional, default = 'Feed for Node.js'
        feedLinks: {
            json: 'https://example.com/json',
            atom: 'https://example.com/atom',
        },
        author: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            link: 'https://example.com/johndoe'
        }
    });
    res.set('Content-Type', 'text/xml');
    res.send(feed.rss2());

});
module.exports = router;

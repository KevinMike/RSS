const express = require('express');
const router = express.Router();
const Feed = require('feed');
const reader = require('../helpers/readStream');
const fs = require('fs');
router.get('/', function (req, res, next) {
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
    //Add security phrases
    reader('../RSS/public/frases.txt')
        .then((data) => {
            feed.addItem({
                title: 'Frases de Seguridad',
                //description: 'description',
                content: data,
            });
            res.set('Content-Type', 'text/xml');
            res.send(feed.rss2());
        });

});

router.get('/phrases', function (req, res, next) {


});
module.exports = router;

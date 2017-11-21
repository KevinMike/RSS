const express = require('express');
const router = express.Router();
const Feed = require('feed');
const reader = require('../helpers/readStream');
const scraper = require('../helpers/scraper');

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
    //Add content
    reader('../RSS/public/frases.txt')
        .then((data) => {
            feed.addItem({
                title: 'Frases de Seguridad',
                content: data,
            });
            return scraper('http://markets.businessinsider.com/commodities/copper-price','push-data');
        })
        .then((data) => {
            console.log('valor devuelto' + data)
            feed.addItem({
                title: 'Precio del Cobre',
                content: data,
            });
            res.set('Content-Type', 'text/xml');
            res.send(feed.rss2());
        })
});


module.exports = router;
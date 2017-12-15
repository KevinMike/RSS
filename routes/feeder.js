const express = require('express');
const router = express.Router();
const Feed = require('feed');
const reader = require('../helpers/readStream');
const query = require('../helpers/query');
const feederService = require('../services/feeder');
router.get('/', function (req, res, next) {
    var feed = new Feed({
        title: 'Southern Peru Copper Corporation',
        description: 'Indicadores de producción de cobre',
        image: 'http://localhost/images/logo.jpg',
        favicon: 'http://localhost/favicon.png',
        copyright: 'All rights reserved',
        updated: new Date(2013, 6, 14), // optional, default = today
        author: {
            name: 'Kevin Herrera',
            email: 'ibecti@southernperu.com.pe',
        }
    });
    //Add content
    reader.readRandomLine('../RSS/public/frases.txt')
        .then((data) => {
            feed.addItem({
                title: 'Frases de Seguridad - ' + data,
                content: data,
            });
            return reader.readFile('../RSS/public/copperPrice.txt')
        })
        //precio del cobre
        .then((data) => {
            feed.addItem({
                title: 'Precio del Cobre - ' + data,
                content: data,
            });
            return query.tagsValues(['WI220049', 'zi230273a'])
        })
        .then((result) => {
            let ratioFusion = Math.round(result[0].recordset[0].Value * 100) / 100;
            feed.addItem({
                title: 'Ratio de Fusión del ISA - ' + ratioFusion + ' t/h',
                content: 'Ratio de Fusión del ISA - ' + ratioFusion + ' t/h',
            });
            let alturaLanza = Math.round(result[1].recordset[0].Value * 100) / 100;
            feed.addItem({
                title: 'Altura de la lanza - ' + alturaLanza + ' m',
                content: 'Altura de la lanza - ' + alturaLanza + ' m',
            });
            return query.tagsValues(['A290_FIT_601.PV', 'TS-290004', 'TC-290004', 'FIT_00206_VALUE', 'FIT_00226_VALUE', 'FIC-290246.PV'])
        })
        .then(results => {
            let A290_FIT_601 = results[0].recordset[0].Value;
            let TS_290004 = results[1].recordset[0].Value;
            let TC_290004 = results[2].recordset[0].Value;
            let FIT_00206_VALUE = results[3].recordset[0].Value;
            let FIT_00226_VALUE = results[4].recordset[0].Value;
            let FIC_290246 = results[5].recordset[0].Value;
            let CPS4 = ((A290_FIT_601 > 25000) && (TS_290004 === 0) && (TC_290004 === 0)) ? 'Convertidor 4 soplando' : 'Convertidor 4 en stand by';
            let CPS5 = (FIT_00206_VALUE > 25000) ? 'Convertidor 5 soplando' : 'Convertidor 5 en stand by';
            let CPS6 = (FIT_00226_VALUE > 22000) ? 'Convertidor 6 soplando' : 'Convertidor 6 en stand by';
            let CPS7 = (FIC_290246 > 22000) ? 'Convertidor 7 soplando' : 'Convertidor 7 en stand by';
            feed.addItem({
                title: CPS4,
                content: CPS4,
            });
            feed.addItem({
                title: CPS5,
                content: CPS5,
            });
            feed.addItem({
                title: CPS6,
                content: CPS6,
            });
            feed.addItem({
                title: CPS7,
                content: CPS7,
            });
            res.set('Content-Type', 'text/xml');
            res.send(feed.rss2());
        })
        .catch((err) => {
            res.send(err)
        });
});
router.get('/:id', function (req, res, next) {
    feederService.xmlContent({_id: req.params.id})
        .then(xml => {
            res.set('Content-Type', 'text/xml');
            res.send(xml);
        })
        .catch(err => {
            res.send(err);
        });

});

module.exports = router;
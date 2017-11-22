const express = require('express');
const router = express.Router();
const Feed = require('feed');
const reader = require('../helpers/readStream');
const scraper = require('../helpers/scraper');
const query = require('../helpers/query');
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
                title: 'Frases de Seguridad - '+data,
                content: data,
            });
            //return scraper('http://markets.businessinsider.com/commodities/copper-price', 'push-data');
            return query.tagsValues(['WI220049', 'zi230273a'])
            //return query.tagsValues(['A290_FIT_601.PV', 'TS-290004', 'TC-290004', 'FIT_00206_VALUE', 'FIT_00226_VALUE', 'FIC-290246.PV'])
        })
        //precio del cobre
        /*.then((data) => {
            console.log('valor devuelto' + data);
            feed.addItem({
                title: 'Precio del Cobre',
                content: data,
            });
            return query.tagsValues(['WI220049', 'zi230273a'])
        })
        .catch(error=>{
            return query.tagsValues(['WI220049', 'zi230273a'])
        })*/
        .then((result) => {
            feed.addItem({
                title: 'Ratio de Fusión del ISA - '+result[0].recordset[0].Value + ' m',
                content: 'Ratio de Fusión del ISA - '+result[0].recordset[0].Value + ' th/h',
            });
            feed.addItem({
                title: 'Altura de la lanza - '+result[1].recordset[0].Value + ' m',
                content: 'Altura de la lanza - '+result[1].recordset[0].Value + ' m',
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
            console.log(A290_FIT_601,TS_290004,TC_290004,FIT_00226_VALUE,FIT_00206_VALUE,FIC_290246);
            let CPS4 = ((A290_FIT_601 > 25000) && (TS_290004 === 0) && (TC_290004 === 0)) ? 'Convertidor 4 soplando' : 'Convertidor 4 en stand by';
            let CPS5 = (FIT_00206_VALUE > 25000) ? 'Convertidor 5 soplando' : 'Convertidor 5 en stand by';
            let CPS6 = (FIT_00226_VALUE > 22000) ? 'Convertidor 6 soplando' : 'Convertidor 6 en stand by';
            let CPS7 = (FIC_290246 > 22000) ? 'Convertidor 7 soplando' : 'Convertidor 7 en stand by';
            console.log(CPS7,CPS6,CPS5,CPS4);
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

router.get('/test', function (req, res, next) {
    query.tagsValues(['WI220049', 'zi230273a'])
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        });
});

module.exports = router;
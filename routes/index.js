var express = require('express');
var router = express.Router();
var indicatorsDAL = require('../dal/indicator');
var phrasesDAL = require('../dal/phrase');
var comunicatesDAL = require('../dal/comunicate');
var feedersDAL = require('../dal/feeder');
/* GET home page. */
router.get('/', function (req, res, next) {
    feedersDAL.list().then(records => res.render('rss', {feeders: records}))
        .catch(err => next(err))
});
router.get('/rss/new', function (req, res, next) {
    Promise.all([indicatorsDAL.list(), comunicatesDAL.list(), phrasesDAL.list()])
        .then(results => {
            res.render('rssCreate', {indicators: results[0], comunicates: results[1], phrases: results[2]});
        })
        .catch(err => {
            res.send(err);
        })
});
router.get('/rss/edit/:id', function (req, res, next) {
    Promise.all([indicatorsDAL.list(), comunicatesDAL.list(), phrasesDAL.list()])
        .then(results => {
            feedersDAL.getOne({_id: req.params.id})
                .then(record => {
                    res.render('rssEdit', {
                        indicator: record,
                        indicators: results[0],
                        comunicates: results[1],
                        phrases: results[2]
                    });
                })
                .catch(err => {
                    res.send(err);
                })
        })
        .catch(err => {
            res.send(err);
        })
});

router.get('/phrases', function (req, res, next) {
    phrasesDAL.list().then(records => res.render('phrases', {phrases: records}))
        .catch(err => next(err))

});
router.get('/comunicates', function (req, res, next) {
    comunicatesDAL.list().then(records => {
        res.render('comunicates', {comunicates: records});
    }).catch(err => {
        res.send(err);
    })
});
router.get('/indicators', function (req, res, next) {
    indicatorsDAL.list().then(records => {
        res.render('indicators', {indicators: records});
    }).catch(err => {
        res.send(err);
    })

});
var converters = require('../services/converters');
var price = require('../dal/cooperPrice');
router.get('/test', function (req, res, next) {
    converters()
        .then(record => res.send(record))
        .catch(err => {
            res.statusCode = 500;
            res.send(err)
        })
});


module.exports = router;


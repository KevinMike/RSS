const express = require('express');
const router = express.Router();
const comunicates = require('../dal/comunicate');
const feeders = require('../dal/feeder');
const phrases = require('../dal/phrase');
const indicators = require('../dal/indicator');
const mongoose = require('mongoose');
/* indicators */
router.get('/indicators', function (req, res, next) {
    indicators.list()
        .then(items => {
            res.send(items)
        })
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.post('/indicators', function (req, res, next) {
    indicators.create(req.body)
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.put('/indicators/:id', function (req, res, next) {
    indicators.update({_id: req.params.id}, req.body)
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.delete('/indicators/:id', function (req, res, next) {
    indicators.remove({_id: req.params.id})
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});

/* phrases */
router.get('/phrases', function (req, res, next) {
    phrases.list()
        .then(items => {
            res.send(items)
        })
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.post('/phrases', function (req, res, next) {
    phrases.create(req.body)
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.put('/phrases/:id', function (req, res, next) {
    phrases.update({_id: req.params.id}, req.body)
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.delete('/phrases/:id', function (req, res, next) {
    phrases.remove({_id: req.params.id})
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});

/* comunicates */
router.get('/comunicates', function (req, res, next) {
    comunicates.list()
        .then(items => {
            res.send(items)
        })
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.post('/comunicates', function (req, res, next) {
    comunicates.create(req.body)
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.put('/comunicates/:id', function (req, res, next) {
    comunicates.update({_id: req.params.id}, req.body)
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.delete('/comunicates/:id', function (req, res, next) {
    comunicates.remove({_id: req.params.id})
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});

/* feeders */
router.get('/feeders', function (req, res, next) {
    feeders.list()
        .then(items => {
            res.send(items)
        })
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.post('/feeders', function (req, res, next) {
    feeders.create(req.body)
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.put('/feeders', function (req, res, next) {
    feeders.update({_id: req.body.id}, req.body)
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.delete('/feeders', function (req, res, next) {
    feeders.remove({_id: req.body.id})
        .then(item => res.send(item))
        .catch(err => {
            res.statusCode = 404;
            res.send(err);
        })
});
router.put('/api/feeders/:id/indicators', function (req, res, next) {
    try {
        let indicators = (typeof req.body.indicators == 'string') ? [req.body.indicators] : req.body.indicators;
        let tasks = [];
        if (indicators.length > 0) {
            for (let i = 0; i < indicators.length; i++) {
                tasks.push(feeders.addIndicator({_id: req.params.id}, new mongoose.Types.ObjectId(String(indicators[i]))))
            }
            Promise.all(tasks)
                .then(values => res.send(values))
                .catch(err => {
                    res.statusCode = 404;
                    res.send(err);
                })
        }
        else {
            throw new Error('Incorret format of data, send an array named indicators to this path')
        }
    }
    catch (err) {
        res.statusCode = 404;
        res.send(err)
    }
});
router.put('/feeders/:id/comunicates', function (req, res, next) {
    try {
        let comunicates = (typeof req.body.comunicates == 'string') ? [req.body.comunicates] : req.body.comunicates;
        let tasks = [];
        if (comunicates.length > 0) {
            for (let i = 0; i < comunicates.length; i++) {
                tasks.push(feeders.addComunicate({_id: req.params.id}, new mongoose.Types.ObjectId(String(comunicates[i]))))
            }
            Promise.all(tasks)
                .then(values => res.send(values))
                .catch(err => {
                    res.statusCode = 404;
                    res.send(err);
                })
        }
        else {
            throw new Error('Incorret format of data, send an array named comunicates to this path')
        }
    }
    catch (err) {
        res.statusCode = 404;
        res.send(err);
    }

});
router.put('/feeders/:id/phrases', function (req, res, next) {
    try {
        let phrases = (typeof req.body.phrases == 'string') ? [req.body.phrases] : req.body.phrases;
        let tasks = [];
        if (phrases.length > 0) {
            for (let i = 0; i < phrases.length; i++) {
                tasks.push(feeders.addPhrase({_id: req.params.id}, new mongoose.Types.ObjectId(String(phrases[i]))))
            }
            Promise.all(tasks)
                .then(values => res.send(values))
                .catch(err => {
                    res.statusCode = 404;
                    res.send(err);
                })
        }
        else {
            throw new Error('Incorret format of data, send an array named phrases to this path')
        }
    }
    catch (err) {
        res.statusCode = 404;
        res.send(err)
    }

});

module.exports = router;

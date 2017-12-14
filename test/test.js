const mocha = require('mocha');
const price = require('../dal/cooperPrice');
const priceMiddleware = require('../middleware/indicatorsMiddleware');
const feederDal = require('../dal/feeder');
const feeder = require('../models/feeder');
const convertersService = require('../services/converters');
const expect = require('expect');

describe('#Precio del cobre', function () {
    it('assertion success', async (done) => {
        return price.getlast().then(record => {
            console.log(record);
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })

    });
});

describe('#Convertidores', function () {
    it('Estado de los convertidores', function (done) {
        return convertersService()
            .then(record => {
                console.log(record)
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })

    });
});
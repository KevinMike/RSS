const mocha = require('mocha');
const price = require('../dal/cooperPrice');
const priceMiddleware = require('../middleware/indicatorsMiddleware');
const feederDal = require('../dal/feeder');
const feeder = require('../models/feeder');
const convertersService = require('../services/converters');
const expect = require('expect');

describe('#Precio del cobre', function () {
    it('recuperar precio del cobre', async () => {
        const result = await price.getlast();
        expect(result.price).to.equal(6538.5);
    })
});

describe('#Convertidores', function () {
    it('Estado de los convertidores', function (done) {
        return convertersService()
            .then(record => {
                console.log(record);
                done();
            })
            .catch(err=>done(err))

    });
});
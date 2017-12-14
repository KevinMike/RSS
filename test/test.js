const mocha = require('mocha');
const price = require('../dal/cooperPrice');
const priceMiddleware = require('../middleware/indicatorsMiddleware');
const feederDal = require('../dal/feeder');
const feeder = require('../models/feeder');
describe('#save()', function () {
    it('Get last cooper price', function (done) {
        const precio = price.getlast();
        console.log(precio);
        if (precio !== undefined) {
            done()
        }
        else {
            done(precio)
        }
    });
});

/*
describe('#middleware indicators', function () {
    it('check if element exists', function (done) {
        priceMiddleware.checkIfExist('WI220049',function (err) {
            if(err)
                return done(err);
            else
                return done();
        })
    });
});*/

/*
describe('#Feeder, retriave information', function () {
    it('update feeder', function (done) {
        return feederDal
            .getOne({_id:'5a2f87f53f026b010865e696'})
            .then(done)
    });
});
*/

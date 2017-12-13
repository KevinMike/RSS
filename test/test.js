const mocha = require('mocha');
const price = require('../dal/cooperPrice');
const priceMiddleware = require('../middleware/indicatorsMiddleware');
var feedersDAL = require('../dal/feeder');
describe('#save()', function () {
    it('Get last cooper price', function (done) {
        const precio = price.getlast();
        console.log(precio.price)
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


describe('#Feeder, retriave information', function () {
    it('update feeder', function (done) {
        return feedersDAL.getOne({_id:'5a2ebfe24931072bdc6375fa'})
            .then(record => {

                console.log(record)
                done()
            })
            .catch(err => {
                done(err)
            })

    });
});

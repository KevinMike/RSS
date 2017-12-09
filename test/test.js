const mocha = require('mocha');
const price = require('../dal/cooperPrice');
const priceMiddleware = require('../middleware/indicatorsMiddleware');
/*describe('#save()', function () {
    it('Get last cooper price', function (done) {
        const precio = price.getlast();
        if (precio !== undefined) {
            console.log(precio);
            done()
        }
        else {
            done(precio)
        }
    });
});*/

describe('#middleware indicators', function () {
    it('check if element exists', function (done) {
        priceMiddleware.checkIfExist('WI220049',function (err) {
            if(err)
                return done(err);
            else
                return done();
        })
    });
});
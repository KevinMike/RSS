const mocha = require('mocha');
const price = require('../dal/cooperPrice');

describe('#save()', function () {
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
});
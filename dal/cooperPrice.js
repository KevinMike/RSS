const cooperPrice = require('../models/cooperPrice');
module.exports = {
    create: (data) => {
        return new Promise(function (resolve, reject) {
            return cooperPrice.create(data, function (err, cooperPrice) {
                if (err) return reject(err);
                return resolve(cooperPrice);
            });
        });
    },
    getlast: function() {
        return new Promise(function (resolve, reject) {
            return cooperPrice.findOne().sort({createdAt: -1}).exec(function(err, price) {
                if(err)
                    return reject(err);
                return resolve(price);
            });
        });
    }
};
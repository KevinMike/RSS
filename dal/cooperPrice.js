const cooperPrice = require('../models/cooperPrice');
module.exports = {
    create: (data) => {
        return new Promise(function (resolve, reject) {
            cooperPrice.create(data, function (err, cooperPrice) {
                if (err) return reject(err);
                return resolve(cooperPrice);
            });
        });
    },
    getlast : ()=>{
        return cooperPrice.findOne().sort({ field: -_id }).limit(1)
    }
};
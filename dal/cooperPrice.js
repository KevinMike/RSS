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
    getlast: () => {
        let query = cooperPrice.find().sort({"_id": -1}).limit(1);
        query.exec(function(err,record){
            if (err)
                return err;
            else
                return record
        });
    }
};
const indicator = require('../models/indicator');
module.exports = {
    create: (data) => {
        return new Promise(function (resolve, reject) {
            indicator.create(data, function (err, indicator) {
                if (err) return reject(err);
                return resolve(indicator);
            });
        });
    },
    update: (query, data) => {
        return new Promise(function (resolve, reject) {
            indicator.update(query, {$set: data}, function (err, indicator) {
                if (err) return reject(err);
                return resolve(indicator)
            });
        })

    },
    remove: (query) => {
        return new Promise(function (resolve, reject) {
            indicator.remove(query, function (err, indicator) {
                if (err) return reject(err);
                return resolve(indicator);
            })
        })
    },
    list: () => {
        return new Promise(function (resolve, reject) {
            indicator.find({}, function (err, indicators) {
                if (err) return reject(err);
                return resolve(indicators)
            })
        })
    }
};
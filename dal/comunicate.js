const comunicate = require('../models/comunicate');
module.exports = {
    create: (data) => {
        return new Promise(function (resolve, reject) {
            comunicate.create(data, function (err, comunicate) {
                if (err) return reject(err);
                return resolve(comunicate);
            });
        });
    },
    update: (query, data) => {
        return new Promise(function (resolve, reject) {
            comunicate.update(query, {$set: data}, function (err, comunicate) {
                if (err) return reject(err);
                return resolve(comunicate)
            });
        })

    },
    remove: (query) => {
        return new Promise(function (resolve, reject) {
            comunicate.remove(query, function (err, comunicate) {
                if (err) return reject(err);
                return resolve(comunicate);
            })
        })
    },
    list: () => {
        return new Promise(function (resolve, reject) {
            comunicate.find({}, function (err, comunicates) {
                if (err) return reject(err);
                return resolve(comunicates)
            })
        })
    }
};
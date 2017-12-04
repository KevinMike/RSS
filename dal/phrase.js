const phrase = require('../models/phrase');
module.exports = {
    create: (data) => {
        return new Promise(function (resolve, reject) {
            phrase.create(data, function (err, phrase) {
                if (err) return reject(err);
                return resolve(phrase);
            });
        });
    },
    update: (query, data) => {
        return new Promise(function (resolve, reject) {
            phrase.update(query, {$set: data}, function (err, phrase) {
                if (err) return reject(err);
                return resolve(phrase)
            });
        })

    },
    remove: (query) => {
        return new Promise(function (resolve, reject) {
            phrase.remove(query, function (err, phrase) {
                if (err) return reject(err);
                return resolve(phrase);
            })
        })
    },
    list: () => {
        return new Promise(function (resolve, reject) {
            phrase.find({}, function (err, phrases) {
                if (err) return reject(err);
                return resolve(phrases)
            })
        })
    }
};
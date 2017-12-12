const feeder = require('../models/feeder');
module.exports = {
    create: (data) => {
        return new Promise(function (resolve, reject) {
            feeder.create(data, function (err, feeder) {
                if (err) return reject(err);
                return resolve(feeder);
            });
        });
    },
    update: (query, data) => {
        return new Promise(function (resolve, reject) {
            feeder.update(query, {$set: data}, function (err, feeder) {
                if (err) return reject(err);
                return resolve(feeder)
            });
        })

    },
    getOne: (query) => {
        return new Promise(function (resolve, reject) {
            feeder.findOne(query,function(err, record) {
                if (err) {
                    reject(err)
                } else {
                    resolve(record);
                }
            });
        })

    },
    addPhrase: (query, phrase) => {
        return new Promise((resolve, reject) => {
            feeder.findOneAndUpdate(query, {$push: {phrases: phrase}}, {upsert: true}, function (err, feeder) {
                if (err) return reject(err);
                return resolve(feeder);
            });
        });
    },
    addIndicator: (query, indicator) => {
        return new Promise((resolve, reject) => {
            feeder.findOneAndUpdate(query, {$push: {indicators: indicator}}, {upsert: true}, function (err, feeder) {
                if (err) return reject(err, feeder);
                return resolve(feeder);
            });
        });
    },
    addComunicate: (query, comunicate) => {
        return new Promise((resolve, reject) => {
            feeder.findOneAndUpdate(query, {$push: {comunicates: comunicate}}, {upsert: true}, function (err, feeder) {
                if (err) return reject(err);
                return resolve(feeder);
            });
        });
    },
    remove: (query) => {
        return new Promise(function (resolve, reject) {
            feeder.remove(query, function (err, feeder) {
                if (err) return reject(err);
                return resolve(feeder);
            })
        })
    },
    list: () => {
        return new Promise(function (resolve, reject) {
            feeder.find({}, function (err, feeders) {
                if (err) return reject(err);
                return resolve(feeders)
            })
        })
    }
};
const cron = require('node-cron');
const scraper = require('../services/cooperPrice');
const cooperPrice = require('../dal/cooperPrice');
const mongoose = require('mongoose');
const config = require('../config');
const fs = require('fs');

mongoose.connect(config.mongodbString, {
    useMongoClient: true
});

/* segundo minuto hora dia mes dia de la semana (0-7)*/
cron.schedule('0/10 * * * * *', function () {
    return scraper('http://markets.businessinsider.com/commodities/copper-price', 'push-data')
        .then(value => cooperPrice.create({price: parseFloat(value)}))
        .then(record => console.log(record.price, record.money, record.createdAt))
        .catch(err => console.log('Error ' + err + ' - ' + new Date()))
});

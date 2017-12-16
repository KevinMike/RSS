const Feed = require('feed');
const feeder = require('../dal/feeder');
const indicators = require('../services/indicators');
const converters = require('../services/converters');
const price = require('../dal/cooperPrice');
const async = require('async');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

module.exports = {
    xmlContent: (query) => {
        return new Promise((resolve, reject) => {
            feeder.getOne(query)
                .then(async function (record) {
                    let feed = new Feed({
                        title: record.name + ' - Southern Peru Copper Corporation',
                        description: record.description,
                        image: 'http://localhost/images/logo.jpg',
                        favicon: 'http://localhost/favicon.png',
                        copyright: 'All rights reserved',
                        author: {
                            name: 'Kevin Herrera',
                            email: 'ibecti@southernperu.com.pe',
                        }
                    });
                    if (record.comunicates.length > 0) {
                        try {
                            record.comunicates.forEach(element => feed.addItem({
                                title: element.comunicate,
                                content: element.comunicate
                            }))
                        }
                        catch (err) {
                            console.log('Error en la lectura de comunicados: ' + err);
                        }
                    }
                    if (record.indicators.length > 0) {
                        try {
                            for (let i = 0; i < record.indicators.length; i++) {
                                let value = await indicators.singleTagValue(record.indicators[i].tag);
                                feed.addItem({
                                    title: record.indicators[i].description + ': ' + value + ' ' + record.indicators[i].units,
                                    content: record.indicators[i].description + ': ' + value + ' ' + record.indicators[i].units
                                });
                            }
                        }

                        catch (err) {
                            console.log('Error en la lectura de indicadores: ' + err);
                        }
                    }
                    if (record.cooperPrice) {
                        try {
                            let copperPrice = await price.getlast();
                            let precio = Math.round((copperPrice.price / 2204.62) * 100) / 100;
                            feed.addItem({
                                title: 'Precio del cobre : ' + precio + ' ' + copperPrice.money,
                                content: 'Precio del cobre : ' + precio + ' ' + copperPrice.money
                            });
                        }
                        catch (err) {
                            console.log('Error en la lectura de precios: ' + err);
                        }
                    }
                    if (record.cnvs) {
                        try {
                            let convertersStatus = await converters();
                            feed.addItem({
                                title: convertersStatus.cnv4,
                                content: convertersStatus.cnv4
                            });
                            feed.addItem({
                                title: convertersStatus.cnv5,
                                content: convertersStatus.cnv5
                            });
                            feed.addItem({
                                title: convertersStatus.cnv6,
                                content: convertersStatus.cnv6
                            });
                            feed.addItem({
                                title: convertersStatus.cnv7,
                                content: convertersStatus.cnv7
                            });
                        }
                        catch (err) {
                            console.log('Error en la lectura del estado de los convertidores: ' + err);
                        }
                    }
                    if (record.phrases.length > 0) {
                        try {
                            let randomIndex = Math.floor(Math.random() * record.phrases.length);
                            feed.addItem({
                                title: record.phrases[randomIndex].phrase,
                                content: record.phrases[randomIndex].phrase
                            })
                        }
                        catch (err) {
                            console.log('Error en la lectura de frases: ' + err)
                        }
                    }
                    resolve(feed.rss2());
                })
                .catch(err => reject(err))
        })
    }
};
const Feed = require('feed');
const feeder = require('../dal/feeder');
const price = require('../dal/cooperPrice');
const indicators = require('../services/indicators');
const converters = require('../services/converters');
module.exports = {
    xmlContent: (query) => {
        return new Promise((resolve, reject) => {
            feeder.getOne(query)
                .then(record => {
                    console.log(record);
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
                        record.comunicates.forEach(item => feed.addItem({
                            title: item.comunicate,
                            content: item.comunicate
                        }))
                    }
                    if (record.cooperPrice) {
                        cooperPrice = price.getlast();
                        if (cooperPrice !== undefined) {
                            feed.addItem({
                                title: 'Precio del cobre ' + cooperPrice.price + ' ' + cooperPrice.money,
                                content: 'Precio del cobre ' + cooperPrice.price + ' ' + cooperPrice.money
                            })

                        }
                    }
                    if (record.indicators.length > 0) {
                        record.indicators.forEach(function (element) {
                            indicators.singleTagValue(element.tag).then(result => {
                                feed.addItem({
                                    title: element.description + ' : ' + Math.round(result.recordset[0].Value * 100) / 100 + element.units,
                                    content: element.description + ' : ' + Math.round(result.recordset[0].Value * 100) / 100 + element.units
                                })
                            })
                                .catch(err => {
                                    return null;
                                })
                        });
                    }
                    if (record.cnvs) {
                        converters
                            .then(result => {
                                feed.addItem({
                                    title: result.cnv4,
                                    content: result.cnv4
                                });
                                feed.addItem({
                                    title: result.cnv5,
                                    content: result.cnv5
                                });

                                feed.addItem({
                                    title: result.cnv6,
                                    content: result.cnv6
                                });

                                feed.addItem({
                                    title: result.cnv7,
                                    content: result.cnv7
                                });
                            })
                            .catch(err => {
                                return null;
                            })
                    }
                    if (record.phrases.length > 0) {
                        var ramdon = Math.floor(Math.random() * record.phrases.length);
                        feed.addItem({
                            title: record.phrase[ramdon],
                            content: record.phrase[ramdon]
                        });
                    }
                    resolve(feed.rss2());
                })
                .catch(err => reject(err))
        })
    }
};
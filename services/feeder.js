const Feed = require('feed');
const feeder = require('../dal/feeder');
const price = require('../dal/cooperPrice');

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
                        feed.addItem({
                            title: 'Precio del cobre ' + cooperPrice.price + ' ' + cooperPrice.money,
                            content: 'Precio del cobre ' + cooperPrice.price + ' ' + cooperPrice.money
                        })
                    }
                    if (record.phrases.length > 0) {
                        record.phrases.forEach(item => feed.addItem({
                            title: item.phrase,
                            content: item.phrase
                        }))
                    }

                    resolve(feed.rss2());
                })
                .catch(err => reject(err))
        })
    }
};
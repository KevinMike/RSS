const request = require('request');
const cheerio = require('cheerio');
module.exports = function (url, classname) {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {
            if (!error) {
                let $ = cheerio.load(html);
                let coppperPrice = $('.' + classname + '').html();
                resolve(coppperPrice+' USD')
            }
            else {
                reject(error)
            }
        });
    })
};
const request = require('request');
const cheerio = require('cheerio');
module.exports = function (url, classname) {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {
            if (!error) {
                let $ = cheerio.load(html);
                let cooperPrice = $('.' + classname).html();
                resolve(cooperPrice.replace (/,/g, ""))
            }
            else {
                reject(error)
            }
        });
    })
};
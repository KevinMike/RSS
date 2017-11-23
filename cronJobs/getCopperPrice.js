const cron = require('node-cron');
const scraper = require('../helpers/scraper');
const fs = require('fs');
/* segundo minuto hora dia mes dia de la semana (0-7)*/
cron.schedule('0 0 0 * * *', function () {
    return scraper('http://markets.businessinsider.com/commodities/copper-price', 'push-data').then((value) => {
        var stream = fs.createWriteStream("public/copperPrice.txt");
        stream.once('open', function(fd) {
            stream.write(value);
            stream.end();
        });
        console.log(value + ', actualizado el '+ new Date());
    }).catch((err)=>console.log('Error ' + err+ ' - '+new Date()));
});
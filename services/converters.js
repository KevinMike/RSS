const indicatorsService = require('./indicators');
module.exports = function () {
    return new Promise(function (resolve, reject) {
        return indicatorsService.tagsValues(['A290_FIT_601.PV', 'TS-290004', 'TC-290004', 'FIT_00206_VALUE', 'FIT_00226_VALUE', 'FIC-290246.PV'])
            .then(function (results) {
                let A290_FIT_601 = results[0].recordset[0].Value;
                let TS_290004 = results[1].recordset[0].Value;
                let TC_290004 = results[2].recordset[0].Value;
                let FIT_00206_VALUE = results[3].recordset[0].Value;
                let FIT_00226_VALUE = results[4].recordset[0].Value;
                let FIC_290246 = results[5].recordset[0].Value;
                let CPS4 = ((A290_FIT_601 > 25000) && (TS_290004 === 0) && (TC_290004 === 0)) ? 'Convertidor 4 soplando' : 'Convertidor 4 en stand by';
                let CPS5 = (FIT_00206_VALUE > 25000) ? 'Convertidor 5 soplando' : 'Convertidor 5 en stand by';
                let CPS6 = (FIT_00226_VALUE > 22000) ? 'Convertidor 6 soplando' : 'Convertidor 6 en stand by';
                let CPS7 = (FIC_290246 > 22000) ? 'Convertidor 7 soplando' : 'Convertidor 7 en stand by';
                resolve({cnv4: CPS4, cnv5: CPS5, cnv6: CPS6, cnv7: CPS7});
            })
            .reject(err => {
                console.log('Error on converters service ${err}');
                resolve(null)
            })
    })
};
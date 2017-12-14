const sql = require('mssql/msnodesqlv8');
const credentials = require('../database.json');
const async = require('async');
const config = {
    server: credentials.server,
    database: credentials.database,
    user: credentials.user,
    password: credentials.password,
    driver: 'msnodesqlv8',
    connectionTimeout : 5000,
    parseJSON: true,
    options: {
        trustedConnection: true
    }
};
module.exports = {
    tagsValues: function (tagsnames) {
        return new Promise((resolve, reject) => {
            let queries = [];
            let pool = new sql.ConnectionPool(config, err => {
                if (err)
                    console.log(err);
                    reject(err);
                tagsnames.forEach(item => {
                    queries.push(function (callback) {
                        pool.request()
                            .query("SELECT [TagName],[Value] FROM [Runtime].[dbo].[v_AnalogLive] where [TagName] = '" + item + "'   ", (err, result) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    callback(null, result);
                                }
                            })
                    });
                });
                async.parallel(queries, function (err, results) {
                    if (err)
                        reject(err);
                    resolve(results);
                })
            });
            pool.on('error', err => {
                reject(err);
            })
        });
    },
    singleTagValue: function (tagname) {
        const pool = new sql.ConnectionPool(config);
        return new Promise(function (resolve, reject) {
            sql.connect(config)
                .then(pool => {
                    return pool.request()
                        .input('input_parameter', sql.NVarChar, tagname)
                        .query("SELECT [TagName],[Value] FROM [Runtime].[dbo].[v_AnalogLive] where [TagName] = '${tagname}'")
                })
                .then(result => {
                    sql.close();
                    resolve(result);
                })
                .catch(err => {
                    sql.close();
                    reject(err);
                });
            sql.on('error', err => {
                sql.close();
                reject(err)
            })
        });
    }
};
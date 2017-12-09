const sql = require('mssql/msnodesqlv8');
const credentials = require('../database.json');
const config = {
    server: credentials.server,
    database: credentials.database,
    user: credentials.username,
    password: credentials.password,
    driver: 'msnodesqlv8',
    connectionTimeout: 5000,
    parseJSON: true,
    options: {
        trustedConnection: true
    }
};

module.exports.checkIfExist = function (tagname, next) {
    const pool = new sql.ConnectionPool(config);
    sql.connect(config)
        .then(pool => {
            return pool.request()
                .input('input_parameter', sql.NVarChar, tagname)
                .query("SELECT [TagName],[Value] FROM [Runtime].[dbo].[v_AnalogLive] where [TagName] = '" + tagname + "'")
        })
        .then(result => {
            sql.close();
            if (result.recordset.length > 0)
                return next();
            else
                return next(new Error(message = "Doesn't exits records"))
        })
        .catch(err => {
            sql.close();
            next(err);
        });
    sql.on('error', err => {
        sql.close();
        next(err)
    })
};
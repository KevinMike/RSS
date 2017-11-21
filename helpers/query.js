const sql = require('mssql');
const credentials = {
    "username": "SOUTHERNPERU\\ibecti",
    "password": "Octubre2017",
    "database": "Runtime",
    "server": "HISTORIANF"
};
const config = {
    user: credentials.username,
    password: credentials.password,
    server: credentials.server,
    database: credentials.database
};

module.exports.tagValue = function (tagname) {
    return new Promise(function (resolve, reject) {
        sql.connect(config).then(pool => {
            console.log('copnexcion a l bd')
            return pool.request()
                .input('input_parameter', sql.NVarChar, tagname)
                .query("SELECT [TagName],[Value] FROM [Runtime].[dbo].[v_AnalogLive] where [TagName] = '" + tagname + "'")
        }).then(result => {
            console.dir(result);
            sql.close();
            resolve(result);
            /*return pool.request()
                .input('input_parameter', sql.Int, value)
                .output('output_parameter', sql.VarChar(50))
                .execute('procedure_name')*/
        }).catch(err => {
            sql.close();
            reject(err);
        });
        sql.on('error', err => {
            sql.close();
            reject('error de conecion a la bd')
        })
    });
};


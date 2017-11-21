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
    sql.connect(config).then(pool => {
        return pool.request()
            .input('input_parameter', sql.NVarChar, tagname)
            .query("SELECT [TagName],[Value] FROM [Runtime].[dbo].[v_AnalogLive] where [TagName] = '"+tagname+"'")
    }).then(result => {
        console.dir(result)
        return pool.request()
            .input('input_parameter', sql.Int, value)
            .output('output_parameter', sql.VarChar(50))
            .execute('procedure_name')
    }).then(result => {
        console.dir(result)
    }).catch(err => {
        // ... error checks
    });

    sql.on('error', err => {
        // ... error handler
    })
};


const sql = require('mssql');
const credentials = {
    "username" : "sa",
    "password" : "",
    "database" : "AdventureWorks",
    "server" : "PC01"
};
funtion query(){
    try {
        const pool = await sql.connect('mssql://${credentials.user}:${credentials.password}@${credentials.server}/${credentials.$database}');
        const result = await sql.query`select * from personas`;
    } catch (err) {
        // ... error checks
    }
};

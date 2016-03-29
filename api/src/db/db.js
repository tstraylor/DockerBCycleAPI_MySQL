const  mysql = require('mysql')

module.exports = {
    create: function (dbHost, dbPort, dbName, dbUser, dbPass, connLimit) {
        return mysql.createPool({
            connectionLimit: connLimit,
            host: dbHost,
            port: dbPort,
            user: dbUser,
            password: dbPass,
            database: dbName,
            multipleStatements: true
            })
    }
};

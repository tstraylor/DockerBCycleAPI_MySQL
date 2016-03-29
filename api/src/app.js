var express = require('express');
var app = express();

var dbHost = process.env.DB_HOST;
var dbName = process.env.DB_NAME;
var dbPort = process.env.DB_PORT;
var dbUser = process.env.DB_USER;
var dbPass = process.env.DB_PASS;
var dbConnLimit = 10;

// create the mysql connection pool
var db = require('./db/db.js').create(dbHost, dbPort, dbName, dbUser, dbPass, dbConnLimit);

// create the routes
var station = require('./routes/station')(db);
var _status = require('./routes/status')(db);

app.use('/api', [station,_status]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message,
            error: err
    });
});

module.exports = app;

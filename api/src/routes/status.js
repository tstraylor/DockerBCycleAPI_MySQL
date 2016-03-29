// api used to check the status of the service and database

module.exports = (db) => {

    var express = require('express');
    var router = express.Router();

    router.use('/status', function(req, res, next) {
        console.log('status router.use');
        next();
    });

    router.route('/status')
        .get(function(req, res) {
            console.log('GET /status');
            res.sendStatus(200);
        })
        .post(function(req, res) {
            console.log('POST /status');
            console.log('body: %j', req.body);
            res.sendStatus(200);
        });

    router.route('/status/db')
        .get(function(req, res) {
            console.log('GET /status/db');
            db.query('SELECT 1', function(err, rows) {
            //db.ping(function(err) {
                if(err) {
                    res.status(err.status || 500);
                    res.json({message: err.message, error: err });
                }
                else
                    res.sendStatus(200);
            });
        });

    return router;
};

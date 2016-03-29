// the rest api routes

module.exports = (db) => {

    var express = require('express');
    var router = express.Router();
    var bcycle = require('../models/BCycleStation')(db);

    router.use('/station', function(req, res, next) {
        console.log('station router.use');
        next();
    });

    router.route('/station')
        .get(function(req, res) {
            console.log('GET /station');
            if (req.query.start_lat === undefined && req.query.start_lon === undefined
                && req.query.end_lat === undefined && req.query.end_lon === undefined) {

                console.log('no query values');
                bcycle.getStations(function(rows, err) {
                    if(err) {
                        console.log(err);
                        res.status(err.status || 500);
                        res.json({message: err.message, error: err });
                    }
                    else {
                        res.json(rows);
                    }
                });

            }
            else {

                console.log('start_lat = ' + req.query.start_lat); 
                console.log('start_lon = ' + req.query.start_lon); 
                console.log('end_lat = ' + req.query.end_lat); 
                console.log('end_lon = ' + req.query.end_lon); 

                var params = [];
                params.push(req.query.start_lat);
                params.push(req.query.end_lat);
                params.push(req.query.start_lon);
                params.push(req.query.end_lon);

                bcycle.getStationsInRegion(params, function(rows, err) {
                    if(err) {
                        console.log(err);
                        res.status(err.status || 500);
                        res.json({message: err.message, error: err });
                    }
                    else {
                        res.json(rows);
                    }
                }); 
            }
        })
        .post(function(req, res) {
            console.log('POST /station');
            console.log('body: %j', req.body);
            res.sendStatus(200);
        });

    router.route('/station/:station_id')
        .get(function(req, res) {
            console.log('GET /station/:station_id');

            bcycle.getStation(req.params.station_id, function(rows, err) {
                if(err) {
                    console.log(err);
                    res.status(err.status || 500);
                    res.json({message: err.message, error: err });
                }
                else {
                    res.json(rows);
                }
            });
        });

    return router;
};

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
            if (req.query.StartLat === undefined && req.query.StartLon === undefined
                && req.query.EndLat === undefined && req.query.EndLon === undefined) {

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

                console.log('StartLat = ' + req.query.StartLat); 
                console.log('StartLon = ' + req.query.StartLon); 
                console.log('EndLat = ' + req.query.EndLat); 
                console.log('EndLon = ' + req.query.EndLon); 

                var params = [];
                params.push(req.query.StartLat);
                params.push(req.query.EndLat);
                params.push(req.query.StartLon);
                params.push(req.query.EndLon);

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

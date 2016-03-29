// these methods are used to get data from the mysql database

module.exports = (db) => {

    // this will return all the stations found 
    // in a region
    function getStationsInRegion(params, callback) {

        try {
            console.log("getStationsInRegion");
            var sql = "SELECT * FROM station WHERE Latitude BETWEEN ? AND ? AND Longitude BETWEEN ? AND ?";
            db.query(sql, params, function(err, rows) {
                if(err) {
                    console.log(err);
                    callback(null,err);
                }
                else {
                    callback(rows,null);
                }
            });
        }
        catch(e) {
            console.log('Exception caught: %j',e);
            callback(null,e);
        }
    }

    // this will return all the stations found 
    // in the database
    function getStations(callback) {

        try {
            console.log("getStations");
            db.query("SELECT * FROM station", function(err, rows) {
                if(err) {
                    console.log(err);
                    callback(null,err);
                }
                else {
                    callback(rows,null);
                }
            });
        }
        catch(e) {
            console.log('Exception caught: %j',e);
            callback(null,e);
        }
    }

    // this will return the specified station
    function getStation(station_id, callback) { 
        try { 
            var sql = "SELECT * FROM station WHERE id = ?" 
            var params = [];
            params.push(station_id); 
            db.query(sql, params, function(err, rows) { 
                if(err) {
                    console.log(err);
                    callback(null,err);
                } 
                else { 
                    if(rows) {
                        callback(rows,err);
                    }
                    else
                        callback(null, null);
                } 
            }); 
        }
        catch(e) {
            console.log('Exception caught: %j',e);
            callback(null, e);
        }
    }

    return {
        getStationsInRegion,
        getStations,
        getStation
    };
};

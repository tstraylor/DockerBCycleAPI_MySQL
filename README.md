# Docker BCycle API / BCycle MySQL Database

This project is used to create two Docker container; one to run the BCycle API and the other to run the BCycle DB. 
The [BCycle iOS App](https://github.com/tstraylor/BCycle-App) uses this Docker environment for its data.

## Setup

To run project, you will need to have the following installed:

1. Docker
2. Docker-Compose
3. GIT
4. Nodejs & NPM >= 5.0.0
5. [Paw](https://paw.cloud), [Postman](https://www.getpostman.com), curl, or wget.

*Note:* Dependencies 1-2 come bundled as part of the [Docker Community Edition](https://store.docker.com/search?offering=community&type=edition).

## Running the BCycle Docker Environment

To build and start the BCycle API and DB environment, run: 
```bash
$ cd ${path_to}/DockerBCycleAPI_MySQL
$ docker-compose up --build
```

To ensure Docker has been setup and is running properly, invoke `docker ps` to check for running containers.
```bash
$ docker ps 

CONTAINER ID        IMAGE                            COMMAND                  CREATED             STATUS              PORTS                    NAMES
7d983ff6c292        dockerbcycleapimysql_bcycleapi   "npm start"              About an hour ago   Up About an hour    0.0.0.0:8080->8080/tcp   dockerbcycleapimysql_bcycleapi_1
5c84ccb7d743        dockerbcycleapimysql_bcycledb    "/entrypoint.sh my..."   About an hour ago   Up About an hour    0.0.0.0:3306->3306/tcp   dockerbcycleapimysql_bcycledb_1
```

Now that both Docker containers are up and running you should be able to connect to the API service and the database.

For more information about Docker and Docker commands, consult the [Docker Documentation](https://docs.docker.com).

## BCycle Database
The BCycle database should be reachable via `jdbc:mysql://localhost:3306/bcycle` using the credentials `root:password`.  
The database is simple and contains the one table, station.

```sql

create table station (
    id int(11) NOT NULL AUTO_INCREMENT,
    Name varchar(100) NOT NULL,
    Street varchar(256),
    City varchar(256),
    State varchar(2),
    Zip varchar(10),
    Docks int(11),
    Latitude double,
    Longitude double,
    Created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Updated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)

    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```

The station table contains the station information the Denver and Houston area.

## BCycle API

The BCycle API should be available at ``http::/localhost:8080/api/station``.  The results of the API request will 
be in [JSON](http://www.json.org) format.

Example response:
```json
[
    {
      "id":4,
      "Name":"16th and Platte",
      "Street":"1601 Platte St",
      "City":"Denver",
      "State":"CO",
      "Zip":"80202",
      "Docks":19,
      "Latitude":39.757967,
      "Longitude":-105.007862,
      "Created":"2017-07-01T14:09:03.000Z",
      "Updated":"2017-07-01T14:09:03.000Z"
    },
    {
      "id":5,
      "Name":"19th and Pearl",
      "Street":"620 E 19th Ave",
      "City":"Denver",
      "State":"CO",
      "Zip":"80203",
      "Docks":23,
      "Latitude":39.7461643,
      "Longitude":-104.979648,
      "Created":"2017-07-01T14:09:03.000Z",
      "Updated":"2017-07-01T14:09:03.000Z"
    }
]
```

### Get all stations
```bash
$ curl -X GET http://localhost:8080/api/station
```
### Get a single station
```bash
$ curl -X GET http://localhost:8080/api/station/4
```
### Get all stations in a Region

The following request will return all the stations located in Denver, CO.
```bash
$ curl -X GET "http://localhost:8080/api/station?StartLat=39.68579625066138&EndLat=39.83052771088454&StartLon=-105.0950355298468&EndLon=-104.90676664685525"
```

The following request will return all the stations located in Houston, TX.
```bash
$curl -X GET "http://localhost:8080/api/station?StartLat=29.50&EndLat=29.90&StartLon=-96.39&EndLon=-95.33"
```

## Stopping the BCycle Docker Environment

To stop and clean up the BCycle API and DB environment, run:
```bash
$ docker-compose down
$ docker rmi -f $(docker images -q)
```
This will shut everything down and remove all the Docker images you created.

### Creator

[Thomas Traylor](http://github.com/tstraylor)

### License

Docker BCycle API and Database is available under the MIT license. See the LICENSE file for more info.


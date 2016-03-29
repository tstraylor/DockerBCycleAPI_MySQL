# Docker BCycle API / BCycle MySQL Database

This project is used to create two Docker container; one to run the BCycle API and the other to run the BCycle DB. The [BCycle iOS App](https://github.com/tstraylor/BCycle-App) uses this Docker environment for its data.

## Setup

To run project, you will need to have the following installed:

1. Docker
2. Docker-Compose
3. GIT
4. Nodejs & NPM >= 5.0.0

*Note:* Dependencies 1-2 come bundled as part of the [Docker Toolbox](https://www.docker.com/products/docker-toolbox).

## Running

Ensure Docker has been setup and is running properly.  Invoke `docker ps` to check the environment. If this command
was not successful, consult the [Docker Documentation](https://docs.docker.com/).

To start the BCycle API and DB environment run: `docker-compose up` in the main directory. This may take some
time as it downloads and builds each of the envirionments.

### Creator

[Thomas Traylor](http://github.com/tstraylor)

### License

Docker BCycle API and Database is available under the MIT license. See the LICENSE file for more info.


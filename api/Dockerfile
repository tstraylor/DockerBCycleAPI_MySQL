FROM node:8-alpine
# https://hub.docker.com/_/node/
# Install app dependencies
COPY ./src /src
# Install the node dependencies
RUN cd /src; npm install
WORKDIR /src

# create the needed environment variables
ENV DB_HOST=bcycledb
ENV DB_NAME=bcycle
ENV DB_USER=root
ENV DB_PASS=password
ENV DB_PORT=3306
ENV API_PORT=8080

# let the container know which port to listen on
EXPOSE  8080
# when the contain is up and running, stat
# the bcycle app
CMD ["npm", "start"]


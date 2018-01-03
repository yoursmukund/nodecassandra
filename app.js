var express = require("express");
var app = express();
var config = require("./config");
var setupController = require("./controllers/setupController");
var apiController = require("./controllers/apiController");
var socketController = require("./controllers/socketController");
var cassandra = require('cassandra-driver');

//Initialize Cassandra
const client = new cassandra.Client(config.getCassandraSettings());

//Initialize the API
apiController(app, client);

//Initialize socket
socketController(app, client);

app.use(express.static(`${__dirname}/public`));


app.listen(3000);
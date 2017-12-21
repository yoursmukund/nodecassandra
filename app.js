var express = require("express");
var app = express();
var config = require("./config");
var setupController = require("./controllers/setupController");
var apiController = require("./controllers/apiController");


//Initialize the API
apiController(app);


app.use(express.static(`${__dirname}/public`));


app.listen(3001);
var http = require('http');
var open = require('open');
var socket = require('socket.io'); 
var config = require("../config");
const port = 3001;  


module.exports = function(app, client){

	//Socket creation
    const server = http.Server(app); 
    const io = socket(server);

    // When a client connects, we note it in the console
    io.on('connect', function (socket) {
    	socket.on('getGraphData', function(data) {
	        const query = config.getNodeData();
	        const queryParams = [config.getclientOptions().contactPoints.toString(), data.currentDate, data.oldDate];
	        client.execute(query, queryParams, { prepare: true }, (err, data)=> {
	            if (err) throw err;
	            socket.emit('graphDataResponse', data.rows);
	        });
    	});
    });

    //Socket listening
    server.listen(port, function(err) {  
      if (err) { 
        console.log('error occurred while connecting to client via socket', err); 
       } else { 
          open(`http://localhost:${port}`);
       }
     });

}
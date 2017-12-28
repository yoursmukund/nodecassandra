var http = require('http');
var open = require('open');
var socket = require('socket.io'); 
const port = 3001;  

module.exports = function(app){

	//Socket creation
    const server = http.Server(app); 
    const io = socket(server);

    // When a client connects, we note it in the console
    io.on('connect', function (socket) {
    	socket.on('join', function(data) {
       		console.log(data);
    	});
    });

    //Socket listening
    server.listen(port, function(err) {  
      if (err) { 
        console.log('error occurred while conncting to client via socket', err); 
       } else { 
          open(`http://localhost:${port}`);
       }
     });

}
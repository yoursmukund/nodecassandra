var http = require('http');
var open = require('open');
var socket = require('socket.io'); 
const port = 3000;  

module.exports = function(app){

	//Socket creation
    const server = http.Server(app); 
    const io = socket(server);

    // When a client connects, we note it in the console
    io.on('connection', function (socket) {
        console.log(socket);
    });

    //Socket listening
    server.listen(port, function(err) {  
      if (err) { 
        console.log('error', err); 
       } else { 
          open(`http://localhost:${port}`);
       }
     });

}
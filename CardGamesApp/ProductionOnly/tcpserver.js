/*
*  written by M. Brisfors 2018
*  last modified by M. Brisfors 2018
*/

var net = require("net");

var server = net.createServer();

//listens to the event connection which is a standard event
//for the server objecg in 'net'
server.on("connection", function(socket){
  var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;


/*
* replace this with what we want to do when we create a new connection
*/
  console.log("new client connection is made %s", remoteAddress);


//sockets have their own events. The data event happens when someone
//sends new data over an open socket
  socket.on("data", function(d) {


/*
*  replace this with what we want to do when we receive data.
*  hint: it probably involves dispatching the data locally
*/
    console.log("Data from %s: %s", remoteAddress, d);
    socket.write("Hello " + d);
  });

//we do this once because once the socket is closed it is destroyed
  socket.once("close", function(){


/*
*  replace this with what we want to do when a connection is closed.
*  example: we might want to save their hand as a state and send it
*  back to them if they reconnect
*/
    console.log("Connection from %s closed", remoteAddress);
  });

//what to do when we get an error
  socket.on("error", function(err){

/*
*  replace this with what we want to do on a connection error
*/
    console.log("Connection %s error: %s", remoteAddress, err.message;
  });

});

//9000 is the port and function is what to do when you start listening
server.listen(9000, function(){
    console.log("server listening to %j", server.address());
});

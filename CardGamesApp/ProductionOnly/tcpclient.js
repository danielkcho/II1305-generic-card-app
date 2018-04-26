var net = require("net");

var connection = net.createConnection(9000);

connection.write("hello");





/*
*
* Alternative version that should in theory do the same thing
*
*/

var net = require('net');

var HOST = '127.0.0.1';
var PORT = 9000;

var client = new net.Socket();
client.connect(PORT, HOST)

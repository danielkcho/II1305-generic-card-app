var net = require("net");
var serverPort = 9005;

var client = new net.Socket();

client.on('data', (data) => {
      Alert.alert('Client Received: ' + data);
});

client.on('close', () => {
      Alert.alert('client close');
});

export default client;

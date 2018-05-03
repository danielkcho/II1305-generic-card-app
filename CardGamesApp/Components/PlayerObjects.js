import {Alert} from 'react-native';
//class for handling players
export class Player {
  constructor(name){
    this.name = name;
    //gives a random id, low chance of collision
    this.id = Math.random();
    //gives a random initial color, can be changed later
    this.color = '#' +  Math.random().toString(16).substr(-6);
    //set initial address to 0.0.0.0
    this.addr = '0.0.0.0';
    //define a local variable for a socket. Must be set before used.
    this.connection = 0;
  }

//returns a representation of a players name
  getName(){
    return this.name;
  }

//returns a representation of a players name
  getColor(){
    return this.color;
  }
//returns the players id
  getId(){
  	return this.id;
  }

//returns connection socket
  getConnection(){
    return this.connection;
  }

//returns ip address
  getAddress(){
    return this.addr;
  }

//set the players name after creation
  setName(name){
    this.name = name;
  }

//set the players color after creation
  setColor(color){
    this.color = color;
  }
//set the players color after creation
  setId(id){
    this.id = id;
  }

//set the player TCP socket for connection
  setConnection(socket){
    this.socket = socket;
  }

//set the IP address to the player
  setAddress(addr){
    this.addr = addr;
  }

}

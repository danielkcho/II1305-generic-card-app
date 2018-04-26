import {Alert} from 'react-native';
//class for handling players
export class Player {
  constructor(name){
    this.name = name;
    //gives a random id, low chance of collision
    this.id = Math.random();
    //gives a random initial color, can be changed later
    this.color = '#' +  Math.random().toString(16).substr(-6);
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

}

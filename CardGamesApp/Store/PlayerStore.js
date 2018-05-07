import { EventEmitter } from 'events';
import dispatcher from '../Dispatcher/Dispatcher';
import {Player} from '../Components/PlayerObjects';
net = require('net');

//class for storing all players
class PlayerStore extends EventEmitter{
  constructor(){
    super();
    this.players = [];
    this.me = new Player("me");
  }
// returns list of players
  getAll(){
    return this.players;
  }

  getMe(){
    return this.me;
  }

//adding a player
  addPlayer(player){
    this.players.push(player);
    this.emit("Change");
  }

//someone sent you a player and you want to do 2 things:
//1: check if they have your IP address, since you can't know yourself yet
//2: check if this new player is not you, and in that case make sure you don't have them added yet.
  addPlayerRemote(player){
    let player = player;
    if(player.getId() == this.me.getId() && player.getAddress() != this.me.getAddress()){
      this.me.setAddress(player.getAddress());
      return;
    }
    if(!this.containsAddress(player.getAddress()){
      socket = new net.Socket();
      socket.connect(9000, player.getAddress());
      player.setConnection(socket);
      this.players.push(player);
      this.emit("Change");
    }
  }

//removing a player: iterate through array til id matches then remove and move array to fill
  removePlayer(id){
    for (var i = 0; i < this.players.length; i++) {
      if(this.players[i].getId() == id){
        this.players.splice(i,1);
        break;
      }
    }
    this.emit("Change");
  }

  containsAddress(ip) {
    let i;
    for (i = 0; i < this.players.length; i++) {
      if(this.players[i].getAddress() == ip) {
        return true;
      }
    }
    return false;
  }

  handleActions(action){
    switch(action.type){
      case "ADD_PLAYER": {
        this.addPlayer(action.player);
        break;
      }
      case "ADD_PLAYER_REMOTE": {
        this.addPlayerRemote(action.player);
        break;
      }
      case "REMOVE_PLAYER": {
        this.removePlayer(action.id)
        break;
      }
      default:
        break;
    }
  }
}

const playerStore = new PlayerStore;
dispatcher.register(playerStore.handleActions.bind(playerStore));
window.dispatcher = dispatcher;
export default playerStore;

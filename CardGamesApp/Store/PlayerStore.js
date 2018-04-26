import { EventEmitter } from 'events';
import dispatcher from '../Dispatcher/Dispatcher';
//class for storing all players
class PlayerStore extends EventEmitter{
  constructor(){
    super();
    this.players = [];
  }
// returns list of players
  getAll(){
    return this.players;
  }
//adding a player
  addPlayer(player){
    this.players.push(player);
    this.emit("Change");
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

  handleActions(action){
    switch(action.type){
      case "ADD_PLAYER": {
        this.addPlayer(action.player);
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

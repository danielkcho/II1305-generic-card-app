import { EventEmitter } from 'events';
import dispatcher from '../Dispatcher/Dispatcher';
import FlipCard from '../Components/FlipCard';
import {cardifier, buildDeck} from '../functions/functions';
import {PlayingCard, Deck, Card} from '../Components/CardObjects';

class HandStore extends EventEmitter{

/*
* standard constructor with a local variable for an array of cards
*/
  constructor(){
    super()
    this.faceUp = [];
  }

  count(){
    return this.faceUp.length;
  }
/*
* returns the array of cards
*/
  getAll(){
    return this.faceUp;
  }

  clearHand(){
    this.faceUp = [];
    this.emit("dChange");
    this.emit("Change");
  }
/*
* add a card to the array
*/
  addCardToHand(card){
    card.setStatus('hand');
    this.faceUp.push(card);
    this.emit("dChange");
  }

  removeCardFromHand(card) {
    let i = 0;
    for (i = 0; i < this.faceUp.length; i++){
      if(card.getID() == this.faceUp[i].getID()) {
        this.faceUp.splice(i, 1);
        break;
      }
    }
    this.emit("rChange");
    this.emit("Change");
  }

/*
* this is the function where we define how we handle different types
* of actions. Inside of the switch we check the type of the
* action we send to all the stores. If it is an action we want to
* handle in this store we define how.
*
* Here I added a sample for how this might be done in a way that
* I believe might actually be used.
*/
  handleActions(action){
    switch(action.type){
      case "ADD_CARD_TO_HAND": {
        this.addCardToHand(action.card);
        break;
      }
      case "FROM_HAND_TO_BOARD": {
        this.removeCardFromHand(action.card);
        break;
      }
      case "CLEAR_ALL": {
        this.clearHand();
        break;
      }
      default:
        break;
    }
  }
}

/*
* we export handStore as an object rather than as a class so that
* it is "plug and play". We can immediately use the store after import.
*/

const handStore = new HandStore;
dispatcher.register(handStore.handleActions.bind(handStore));
window.dispatcher = dispatcher;
export default handStore;

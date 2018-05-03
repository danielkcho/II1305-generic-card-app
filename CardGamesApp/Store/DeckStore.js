import { EventEmitter } from 'events';
import dispatcher from '../Dispatcher/Dispatcher';
import FlipCard from '../Components/FlipCard';
import {cardifier, buildDeck} from '../functions/functions';
import {PlayingCard, Deck, Card} from '../Components/CardObjects';
import {Alert} from 'react-native';
/*
*  a store for our deck. Unclear if this implementation will be final.
*/

class DeckStore extends EventEmitter{
//edit this, probably, to get desired functionality
  constructor(){
    super();
    deck = [];
    this.state = {deckPress: false, jokerCount: 0};
  }

//return all cards in deck
  getAll(){
    return this.deck;
  }

  getPressed(){
    return this.state.deckPress;
  }

  getJokerC() {
    return this.state.jokerCount;
  }

//Create a deck
  createDeck(){
    this.deck = buildDeck(new Deck());
    this.emit("dChange");
    this.state.deckPress = true;
  }

  clearDeck(){
    this.deck = buildDeck(new Deck());
    this.emit("Change");
    this.emit("dChange");
  }


//return top card of deck
  pop(){
    this.emit("dChange");
    return this.deck.pop();
  }

  createJoker() {
    this.deck.push(cardifier(new PlayingCard(1,1,0,0)));
    this.state.jokerCount++;
  }

//shuffle deck
  shuffle(){
   this.deck.shuffle();
   this.emit("dChange");
  }

//replace the deck
  setDeck(deck){
    this.deck = deck;
    this.emit("dChange");
  }

//remove top card and do nothing with it
  removeTop(){
    this.deck.pop();
    this.emit("dChange");
}

  handleActions(action){
    switch(action.type){
      case "SHUFFLE_DECK": {
        this.shuffle();
        break;
      }
      case "CREATE_DECK": {
        this.createDeck();
        break;
      }
      case "ADD_JOKER": {
        this.createJoker();
        break;
      }
      case "CLEAR_ALL": {
        this.clearDeck();
        break;
      }
/*
      case "REMOVE_TOP": {
        this.removeTop();
        break;
      }
*/

/*
      case "SET_DECK": {
        this.setDeck(action.deck);
        break;
      }
*/
      default:
        break;
    }
  }
}

const deckStore = new DeckStore;
dispatcher.register(deckStore.handleActions.bind(deckStore));
window.dispatcher = dispatcher;
export default deckStore;

/*
*  Written by M. Brisfors 2018
*  Last mofified by M. Brisfors 2018
*/

import { EventEmitter } from 'events';
import dispatcher from '../Dispatcher/Dispatcher';
import FlipCard from '../Components/FlipCard';
import {cardifier, buildDeck} from '../functions/functions';
import {PlayingCard, Deck, Card} from '../Components/CardObjects';
import MovableCard from '../Components/MovableCard';

/*
*  A store for the game board. Will be shared by all players
*  probably. If reader does not understand what a store is
*  then it is basically a place to store all variables relevant
*  to the component. For more information, do some research on it.
*/

class BoardStore extends EventEmitter{
  constructor(){
    super();
    this.cards = [];
  }

/*
*  return all cards in board store as an array
*/
  getAll(){
    return this.cards;
  }

  clearBoard(){
    this.cards = [];
    this.emit("Change");
    this.emit("rChange");
  }

/*
*  adds a card to the board store's array of cards
*/
  addCardToBoard(card){
    card.setStatus('board');
    this.cards.push(card);
    this.emit("Change");
    this.emit("rChange");
  }

  removeCardFromBoard(card) {
    let i = 0;
    for (i = 0; i < this.cards.length; i++){
      if(card.getID() == this.cards[i].getID()) {
        var card = this.cards.splice(i, 1);
        break;
      }
    }
    this.emit("Change");
  }

/*
*  our action handler for this store. In the switch we
*  handle all the actions we want to react to.
*  As per flux design we will receive all actions from the
*  dispatcher so we will have to define what to do with them.
*/
  handleActions(action){
    switch(action.type){
      case "ADD_CARD_TO_BOARD": {
        this.addCardToBoard(action.card);
        break;
      }
      case "FROM_BOARD_TO_HAND": {
        this.removeCardFromBoard(action.card);
        break;
      }
      case "CLEAR_ALL": {
        this.clearBoard();
      }
      default:
        break;
    }
  }
}
/*
*  exports an instance of a BoardStore object for immediate use
*/
const boardStore = new BoardStore;
dispatcher.register(boardStore.handleActions.bind(boardStore));
window.dispatcher = dispatcher;
export default boardStore;

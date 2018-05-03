import dispatcher from "../Dispatcher/Dispatcher";
import client from "../Multiplayer/Client";

//sample action for adding cards to hand
export function addCardToHand(card){
  dispatcher.dispatch({
    type: "ADD_CARD_TO_HAND",
    card,
  })
}

//sample action for removing cards from hand
export function removeCardFromHand(id){
  dispatcher.dispatch({
    type: "REMOVE_CARD_FROM_HAND",
    id,
  })
}

//action for shuffling deck
export function shuffleDeck(){
  dispatcher.dispatch({
    type: "SHUFFLE_DECK",
  })
}

//tellign everyone that you are filtering out cards
export function filterDeckRemote(num){
  data = {
    type: "FILTER",
    num,
  }
  dispatcher.dispatch(data);
  //for each, somehow:
  //client.write(data);
}

//action for filtering out a number from the deck
export function filterDeck(num){
  dispatcher.dispatch({
    type: "FILTER",
    num,
  })
}

//use this when you are the actor causing change
export function addCardToBoardRemote(card){
  data = {
    type: "ADD_CARD_TO_BOARD",
    card,
  }
  dispatcher.dispatch(data);
  //for each, somehow:
  //client.write(data);
}

//action for adding cards to board
export function addCardToBoard(card){
  dispatcher.dispatch({
    type: "ADD_CARD_TO_BOARD",
    card,
  })
}

//use this when you are the actor
export function removeCardFromBoardRemote(id){
  data = {
    type: "REMOVE_CARD_FROM_BOARD",
    id,
  }
  dispatcher.dispatch(data);
  //for each, somehow:
  //client.write(data);
}

//action for removing cards from board
export function removeCardFromBoard(id){
  dispatcher.dispatch({
    type: "REMOVE_CARD_FROM_BOARD",
    id,
  })
}

//use this when you use the filter
export function filterDeckGRemote(num){
  data = {
    type: "FILTER_GREATER",
    num,
  }
  dispatcher.dispatch(data);
  //for each, somehow:
  //client.write(data);
}

//action for filtering out all cards GoE to num
export function filterDeckG(num){
  dispatcher.dispatch({
    type: "FILTER_GREATER",
    num,
  })
}

//use this when you want to filter
export function filterDeckLRemote(num){
  data = {
    type: "FILTER_LESS",
    num,
  }
  dispatcher.dispatch(data);
  //for each, somehow:
  //client.write(data);
}

//action for filtering all cards LoE to num
export function filterDeckL(num){
  dispatcher.dispatch({
    type: "FILTER_LESS",
    num,
  })
}

//telling everyone to create a deck
export function createDeckRemote(){
  data = {
    type: "CREATE_DECK",
  };
  dispatcher.dispatch(data);
  //for each, somehow:
  //client.write(data);
}

//action for creating deck
export function createDeck(){
  dispatcher.dispatch({
    type: "CREATE_DECK",
  })
}

/*
//tell everyone else to set the deck to something
//probably a good idea to use this after shuffling
export function setDeckRemote(){
  data = {
    type: "SET_DECK",
    deck,
  };
  //for each, somehow:
  //client.write(data);
}
*/

/*
//action for replacing the deck
export function setDeck(deck){
  dispatcher.dispatch({
    type: "SET_DECK",
    deck
  })
}
*/

/*
//tell everyone else to remove the top card of their deck
//probably use this after you draw a card
export function removeTopCardRemote(){
  data = {
    type: "REMOVE_TOP",
  };
  //for each, somehow:
  //client.write(data);
}
*/

/*
//action for discarding the top card of the deck
export function removeTopCard(){
  dispatcher.dispatch({
    type: "REMOVE_TOP",
  })
}
*/

//tell everyone to add a joker to top of deck
export function createJokerRemote(){
  data = {
    type: "ADD_JOKER",
  };
  dispatcher.dispatch(data);
  //for each, somehow:
  //client.write(data);
}

//action for adding joker to top of deck
export function createJoker() {
  dispatcher.dispatch({
    type: "ADD_JOKER",
  })
}

//action for adding a card from hand to board (?)
export function fromHandToBoard(card) {
  dispatcher.dispatch({
    type: "FROM_HAND_TO_BOARD",
    card,
  })
}

//action for adding a card from board to hand (?)
export function fromBoardToHand(card) {
  dispatcher.dispatch({
    type: "FROM_BOARD_TO_HAND",
    card,
  })
}

//action for adding a new player
export function addPlayer(player){
  dispatcher.dispatch({
    type: "ADD_PLAYER",
    player,
  })
}

//action for removing a player
export function removePlayer(id){
  dispatcher.dispatch({
    type: "REMOVE_PLAYER",
    id,
  })
}

export function clearAll(){
  dispatcher.dispatch({
    type: "CLEAR_ALL",
  })
}



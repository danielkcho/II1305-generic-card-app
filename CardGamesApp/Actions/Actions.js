import dispatcher from "../Dispatcher/Dispatcher";

/******************************************************
* This is where we dispatch actions to the dispatcher
* in order for the stores to listen to these dispatches
* and make an internal action based on the given
* dispatched action. All the actions are straight forward
*******************************************************/
export function addCardToHand(card){
  dispatcher.dispatch({
    type: "ADD_CARD_TO_HAND",
    card,
  })
}

export function removeCardFromHand(id){
  dispatcher.dispatch({
    type: "REMOVE_CARD_FROM_HAND",
    id,
  })
}


export function shuffleDeck(){
  dispatcher.dispatch({
    type: "SHUFFLE_DECK",
  })
}

export function filterDeck(num){
  dispatcher.dispatch({
    type: "FILTER",
    num,
  })
}

//action for adding cards to board
export function addCardToBoard(card){
  dispatcher.dispatch({
    type: "ADD_CARD_TO_BOARD",
    card,
  })
}

//action for removing cards from board
export function removeCardFromBoard(id){
  dispatcher.dispatch({
    type: "REMOVE_CARD_FROM_BOARD",
    id,
  })
}

export function filterDeckG(num){
  dispatcher.dispatch({
    type: "FILTER_GREATER",
    num,
  })
}

export function filterDeckL(num){
  dispatcher.dispatch({
    type: "FILTER_LESS",
    num,
  })
}

export function createDeck(){
  dispatcher.dispatch({
    type: "CREATE_DECK",
  })
}

export function createJoker() {
  dispatcher.dispatch({
    type: "ADD_JOKER",
  })
}

export function fromHandToBoard(card) {
  dispatcher.dispatch({
    type: "FROM_HAND_TO_BOARD",
    card,
  })
}

export function fromBoardToHand(card) {
  dispatcher.dispatch({
    type: "FROM_BOARD_TO_HAND",
    card,
  })
}

export function addPlayer(player){
  dispatcher.dispatch({
    type: "ADD_PLAYER",
    player,
  })
}

export function removePlayer(id){
  dispatcher.dispatch({
    type: "REMOVE_PLAYER",
    id,
  })
}

export function clearAll() {
  dispatcher.dispatch({
    type: "CLEAR_ALL",
  })
}

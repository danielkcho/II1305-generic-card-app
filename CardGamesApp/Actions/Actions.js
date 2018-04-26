import dispatcher from "../Dispatcher/Dispatcher";

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



import {Alert} from 'react-native';
//class for handling generic cards
export class Card {
  constructor(face, back){
    this.face = face;
    this.back = back;
  }

//returns a representation of a card's face side
  getFace(){
    return this.face;
  }

//returns a representation of a card's back side
  getBack(){
    return this.back;
  }

//set the face after creation
  setFace(face){
    this.face = face;
  }

//set the back after creation
  setBack(back){
    this.back = back;
  }

  buildWithJSON(json){
    this.face = json.face;
    this.back = json.back;
  }

}

//interactive building simulator with a guy called Jason
//or, perhaps, useless code we need because JSON can't stringify
//object methods
  

//class for handling playing cards in particular
export class PlayingCard extends Card{

  constructor(face, back, color, value){
    super(face, back);
    this.color = color;
    this.value = value;
    this.ID = Math.random() + "-" + color + "-" + value;
    this.status = 'deck';
    this.change = false;
    this.flipped = false;
  }

  getFace(){
    return super.getFace();
  }

  getBack(){
    return super.getBack();
  }

//returns the color (suite) of the card
  getColor(){
    return this.color;
  }

//returns the value of the card
  getValue(){
    return this.value;
  }

//super. Save a way to render the face of the card
  setFace(face){
    super.setFace(face);
  }

//super. Save a way to render the back of the card
  setBack(back){
    super.setBack(back);
  }

//new method for getting a unique identifier.
  getID(){
    return this.ID;
  }

//set status of the card
//someone insert comment about what status means, please
  setStatus(status){
    this.status = status;
  }

//get status
  getStatus() {
    return this.status;
  }

//has this card changed? TRUE/FALSE
  isChanged() {
    return this.change;
  }

  isFlipped() {
    return this.flipped;
  }

  flip() {
    this.flipped = !(this.flipped);
  }


//this card has changed: TRUE <=> FALSE
  changed() {
    this.change = !(this.change);
  }

//this will rebuild the card using a JSON representation of it
//a necessary evil
  buildWithJSON(json){
    this.face = json.face;
    this.back = json.back;
    this.color = json.color;
    this.value = json.value;
    this.ID = json.ID;
    this.status = json.status;
    this.change = json.change;
    this.flipped = json.flipped;
  }

}

//class for representing a deck of cards
export class Deck {
  constructor(){
    this.cards = [];
  }

//JSON stuff again. Shot version, JSON can't handle methods
  buildWithJSON(json){
    this.cards = json.cards;
  }

//shuffle the deck
  shuffle(){
    var i;
    for(i = 0; i<this.cards.length; i++){
      var x = Math.ceil((Math.random()*(this.cards.length-i))) +i;
      var temp = this.cards[i];
      this.cards[i] = this.cards[x-1];
      this.cards[x-1] = temp;
    }
  }

  push(card){
    this.cards.push(card);
  }

//returns 0 if deck is empty
  pop(){
    if(this.cards.length == 0)
    {
      return 0;
    }
    return this.cards.pop();
  }

/*
*  filter out all cards with value of num.
*/
  filterNum(num){
    var i;
    for (i = 0; i<this.cards.length; i++){
      if(this.cards[i].getValue() == num){
        var garbage = this.cards.splice(i, 1);
  i--;
      }
    }
  }

/*
*  filter out all cards with value greater than
*  OR equal to num.
*/
  filterGreaterOrEquals(num){
    var i;
    for (i = 0; i<this.cards.length; i++){
      if(this.cards[i].getValue() >= num){
        var garbage = this.cards.splice(i, 1);
  i--;
      }
    }
  }

/*
*  filter out all cards with value less than
*  OR equal to num.
*/

  filterLessOrEquals(num){
    var i;
    for (i = 0; i<this.cards.length; i++){
      if(this.cards[i].getValue() <= num){
        var garbage = this.cards.splice(i, 1);
  i--;
      }
    }
  }
}

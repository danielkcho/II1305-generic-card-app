import React, {Component} from 'react';
import { Text, AppRegistry, Alert, Button, Dimensions, FlatList, Platform,
  Props, View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import FlipCard from '../Components/FlipCard';
import styles from '../assets/StyleSheets';
import {PlayingCard, Deck, Card} from '../Components/CardObjects';


require("json-circular-stringify");

export function cardifier(playingCard, face) {
  var i = 0;
  var num = playingCard.getValue();
  var sign = 0;
  var color = playingCard.getColor();

  if (num == 0 && color == 0) {
    num = 'Joker';
    sign = 0x2B50;
  }

  if(num>10)
  {
    if(num==11){
      num='J';
    }
    else if (num==12) {
      num='Q';
    }
    else if (num==13) {
      num='K';
    }
    else {
      num='A';
    }
  }

  if(color == 1){  // Hjärter
    sign = 0x2764
  }
  else if(color == 2){ // Spader
    sign = 0x2660
  }
  else if(color == 3){ // Ruter
    sign = 0x2666
  }
  else if (color == 4){ //Klöver
    sign = 0x2663
  }

  var frontCardStyle = <FlipCard perspective={5000} card={playingCard}><View style={styles.card}>
    <Text> {num} </Text>
    <Text> {[Omega = String.fromCharCode(sign)]} </Text>
  </View>
  <View style = {styles.cardback}>
  </View>
  </FlipCard>

  var backCardStyle = <FlipCard perspective={5000} card={playingCard}>
  <View style = {styles.cardback}>
  </View>
  <View style={styles.card}>
    <Text> {num} </Text>
    <Text> {[Omega = String.fromCharCode(sign)]} </Text>
  </View>
  </FlipCard>

  if(face == 'front'){
    return frontCardStyle;
  }
  else if(face == 'back'){
    return backCardStyle;
  }else{
    return <View />
  }

  //playingCard.setFace(frontCardStyle);

  //playingCard.setBack(backCardStyle);

  //return playingCard;
}

export function buildDeck(deck){

  /* card generator function called with all */
  let i = 0;
  let j = 0;
  for(i = 2; i<15; i++){
    for(j = 1; j<5; j++){
     deck.push(new PlayingCard(1,1,j,i));
    }
  }
  return deck;
}

/*
* must use an array of cards
* needs testing
* prelim testing shows promise
*/
export function cardArrayToMap(array){
  output = array.map(index => {
    temp = {};
    temp[index.getID()] = index;
    return temp;
  });
  return output;
}

//needs testing. Seriously.
export function inverseMap(kvmap){
  var inverse = {};
  var temp = kvmap;
  (function(){
    for(var key in temp){
      if(temp.hasOwnProperty(key)){
        inverse[temp[key]] = key;
      }
    }
  })();

  return inverse;
}

/*
* Takes a deck as an input and returns it
* in the form of a KV-object that uses each
* card's unique ID as the key for the card itself.
*
* So for clarity, if you wanted to get the card
* corresponding to the ID "0.3476255646-2-14"
* (ace of spades) you do output[0.3476255646-2-14]
*/

export function kvMapper(deck){
  let i = 0;
  let output = {};
  for(i = 0; i<deck.length; i++)
  {
    temp = deck.pop();
    keyname = temp.getID();
    output[keyname] = temp;
  }
  return output;
}

export function specialkvMapper(deck){
  let i = 0;
  let output = [];
  for(i = 0; i<deck.length; i++)
  {
    temp = deck.pop();
    keyname = temp.getID();
    output[keyname] = {card: temp};
  }
  return output;
}

//function for encoding our messages as JSON strings that can be
//bascally reversed by jsonparser(output).
export function jsonifier(dispatch, argtype){
  type = dispatch.type;

  switch(argtype){
    case "CARD": {
      card = dispatch.card;
      jsoncard = JSON.stringify(card);
      payload = {
        type: type, argType: argtype, arg: jsoncard,
      }
      output = JSON.stringify(payload);
      return output;
    }
    case "DECK": {
      deck = dispatch.deck;
      jsondeck = JSON.stringify(deck);
      payload = {
        type: type, argType: argtype, arg: jsondeck,
      }
      output = JSON.stringify(payload);
      return output;
    }
    case "PLAYER": {
      player = dispatch.player;
      jsonplayer = JSON.stringify(player);
      payload = {
        type: type, argType: argtype, arg: jsonplayer,
      }
      output = JSON.stringify(payload);
      return output;
    }
    case "ARG": {
      payload = {
        type: type, argType: argtype, arg: dispatch.arg,
      }
      output = JSON.stringify(payload);
      return output;
    }
    case "NIL": {
      payload = {
        type: type, argType: argtype,
      }
      output = JSON.stringify(payload);
      return output;
    }
    default:
      break;
  }
}

//parses a json payload that we send over TCP. Function to
//automatically encode our messages in accordance to the
//requirements of this function to come.
export function jsonparser(json){
  type = json.type;

  switch(json.argType){
    case "CARD": {
      card = new PlayingCard(1,1,2,2);
      card.buildWithJSON(JSON.parse(json.arg));
      output = {
      type: type,
      card,
      }
      return output;
    }
    case "DECK": {
      deck = new Deck();
      deck.buildWithJSON(json.arg);
      output = {
      type: type,
      deck,
      }
      return output;
    }
    case "PLAYER": {
      player = new Player(1);
      player.buildWithJSON(json.arg);
      output = {
      type: type,
      player,
      }
      return output;
    }
    case "ARG": {
      output = {
      type: type,
      arg: json.arg,
      }
    }
    case "NIL": {
      output = {
      type: type,
      }
      return output;
    }
    default: break;
  }
}

var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

export function seed(i){
  m_w = i;
  m_z = 987654321;
}

export function random(){
  m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
  m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
  var result = ((m_z << 16) + m_w) & mask;
  result /= 4294967296;
  return result + 0.5;
}

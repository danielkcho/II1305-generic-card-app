import React, { Component } from 'react';
import { Text, AppRegistry, Alert, Button, Dimensions, FlatList, Platform,
  Props, View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';
import handStore from '../Store/HandStore';
import FlipCard from './FlipCard';
import dispatcher from '../Dispatcher/Dispatcher';
import * as Actions from '../Actions/Actions';
import styles from '../assets/StyleSheets'
import {cardifier, buildDeck} from '../functions/functions';
import {PlayingCard, Deck, Card} from './CardObjects';
import deckStore from '../Store/DeckStore';
import MovableCard from '../Components/MovableCard';
import client from '../Multiplayer/Client';

export class DeckComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: [],
    }
  }

  onLongPress = () => {
    cardToSend = deckStore.pop();
    cardToSend.flip();
    Actions.addCardToBoard(cardToSend);
  }

  onPress = () => {

/*
*   So this following code is to try to send JSON strings
*/
    card = cardifier(new PlayingCard(1,1,2,13));
    jsoncard = JSON.stringify(card);
    payload = {type: "ADD_CARD_TO_BOARD", jsoncard,};
    jsonpayload = JSON.stringify(payload);
    client.write(jsonpayload);
    this.addCardToHand();
  }

  componentWillMount(){
    deckStore.on("dChange", () => {
      this.setState({
        deck: deckStore.getAll()
      })
    })
  }

  componentDidMount(){
    this.client = client;
  }

  addCardToHand(){
    Actions.addCardToHand(deckStore.pop());
  }

  render() {
    var deck =
    (<View style={styles.cardback}>
      <TouchableOpacity
       style={styles.button}
       onPress={this.onPress}
       onLongPress={this.onLongPress}
      >
       <Text style={styles.buttonText}>DECK</Text>
      </TouchableOpacity>
      </View>);
    if(deckStore.getAll() == null) {
      return(<View/>)
    }
    else {
      return(deck)
    }
  }

}

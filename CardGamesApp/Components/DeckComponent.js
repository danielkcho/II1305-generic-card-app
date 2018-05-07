import React, { Component } from 'react';
import { Text, AppRegistry, Alert, Button, Dimensions, FlatList, Platform,
  Props, View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';
import handStore from '../Store/HandStore';
import FlipCard from './FlipCard';
import dispatcher from '../Dispatcher/Dispatcher';
import * as Actions from '../Actions/Actions';
import styles from '../assets/StyleSheets'
import {cardifier, buildDeck, jsonifier} from '../functions/functions';
import {PlayingCard, Deck, Card} from './CardObjects';
import deckStore from '../Store/DeckStore';
import MovableCard from '../Components/MovableCard';
import client from '../Multiplayer/Client';


require("json-circular-stringify");

export class DeckComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: [],
    }
  }

  onLongPress = () => {

    card = deckStore.pop();
    Actions.removeTopCardRemote();
    card.flip();
    //var temp = {type: "ADD_CARD_TO_BOARD", card,}
    //var jsonifiedTwo = jsonifier(temp, "CARD")
    Actions.addCardToBoardRemote(card);
    //client.write(jsonifiedTwo);
    
  }

  onPress = () => {
    this.addCardToHand();
    Actions.removeTopCardRemote();
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
    
    card = deckStore.pop();
    Actions.addCardToHand(card);

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

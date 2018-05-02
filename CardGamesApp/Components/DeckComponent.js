import React, { Component } from 'react';
import { Text, AppRegistry, Alert, Button, Dimensions, FlatList, Platform,
  Props, View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import handStore from '../Store/HandStore';
import FlipCard from './FlipCard';
import dispatcher from '../Dispatcher/Dispatcher';
import * as Actions from '../Actions/Actions';
import styles from '../assets/StyleSheets'
import {cardifier, buildDeck} from '../functions/functions';
import {PlayingCard, Deck, Card} from './CardObjects';
import deckStore from '../Store/DeckStore';
import MovableCard from '../Components/MovableCard';

/********************************************************
* This is one of the components that handles the deck.
* It uses properties of Deckstore in order to update
* its props and states.
*********************************************************/
export class DeckComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {deck: []}
  }
  //Once we click on the deck, the function addCartToHand will be triggered.
  onPress = () => {
    this.addCardToHand();
  }

  //The deck will update if something emits a "dChange"
  componentWillMount(){
    deckStore.on("dChange", () => {
      this.setState({
        deck: deckStore.getAll()
      })
    })
  }
  //We pop a card from the deck and send it to the hand
  addCardToHand(){
    Actions.addCardToHand(deckStore.pop());
  }

  //We render the deck
  render() {
    var deck =
    (<View style={styles.cardback}>
      <TouchableHighlight
       style={styles.button}
       onPress={this.onPress}
      >
       <Text style={styles.buttonText}>DECK</Text>
      </TouchableHighlight>
      </View>);
    if(deckStore.getAll() == null) {
      return(<View/>)
    }
    else {
      return(deck)
    }
  }

}

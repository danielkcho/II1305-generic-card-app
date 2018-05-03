import React, { Component } from 'react';
import { Text, AppRegistry, Alert, Button, Dimensions, FlatList, Platform,
  Props, View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, ScrollView } from 'react-native';
import {PlayingCard, Card, Deck} from './CardObjects';
import handStore from '../Store/HandStore';
import FlipCard from './FlipCard';
import dispatcher from '../Dispatcher/Dispatcher';
import * as Actions from '../Actions/Actions';
import {cardifier, buildDeck} from '../functions/functions';
import styles from '../assets/StyleSheets';

export class HandComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {faceUp: [], faceDown: [], cardCount: handStore.getAll().length, rightArrowView: true}
    this.state.faceUp = handStore.getAll();

  }

  //Removes the right arrow
  removeRightArrow() {
    this.setState({
      rightArrowView: false
    })
  }
  //Sets the right arrow
  setRightArrow() {
    this.setState({
      rightArrowView: true
    })
  }

  componentWillMount(){
    handStore.on("dChange", () => {
      this.setState({
        faceUp: handStore.getAll(),
        cardCount: handStore.getAll().length
      })
    })

    handStore.on("rChange", () => {
      this.setState({
        faceUp: handStore.getAll(),
        cardCount: handStore.getAll().length
      })
    })
  }

  render() {
    isCloseToRight = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToRight = 20;
    return layoutMeasurement.width + contentOffset.x >= contentSize.width - paddingToRight;
    };
    var isVisible = (this.state.faceUp.length > 0)? true : false;

    if(isVisible){
      array = this.state.faceUp.map(function(num) {
      if (num.isFlipped()) {
        return num.getBack();
      }
      else {
        return num.getFace();
      }
    });
    }else{
      array = <View/>
    }

    if(this.state.rightArrowView) {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1.8}}>
      <View style={{flexDirection: 'column'}}><Text> {[Omega = String.fromCharCode(0x261A)]}</Text>
      <Text style={{textAlign: 'center'}}>{this.state.cardCount}</Text></View>
      <ScrollView
        horizontal={true}
        onScroll={({nativeEvent}) => {
        if (isCloseToRight(nativeEvent)) {
          this.removeRightArrow();
        }
      }}
      scrollEventThrottle={400}
      >
      {array}
      </ScrollView>
      <Text> {[Omega = String.fromCharCode(0x261B)]} </Text>
      </View>

    )
    }
    else {
      return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1.8}}>
      <View style={{flexDirection: 'column'}}><Text> {[Omega = String.fromCharCode(0x261A)]}</Text>
      <Text style={{textAlign: 'center'}}>{this.state.cardCount}</Text></View>
      <ScrollView
        horizontal={true}
        onScroll={({nativeEvent}) => {
        if (!(isCloseToRight(nativeEvent))) {
          this.setRightArrow();
        }
      }}
      scrollEventThrottle={400}
      >
      {array}
      </ScrollView>
      </View>
     )
    }
  }

}

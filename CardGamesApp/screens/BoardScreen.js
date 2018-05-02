import React, { Component } from 'react';
import { Text, AppRegistry, Alert, Button, Dimensions, FlatList, Platform,
  Props, View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../assets/StyleSheets'
import FlipCard from '../Components/FlipCard';
import {HandComponent} from '../Components/HandComponent';
import {DeckComponent} from '../Components/DeckComponent';
import {PlayerComponent} from '../Components/PlayerComponent';
import {BoardComponent} from '../Components/BoardComponent';
import {cardifier, buildDeck} from '../functions/functions';
import {PlayingCard, Deck, Card} from '../Components/CardObjects';
import handStore from '../Store/HandStore'
import MovableCard from '../Components/MovableCard';
import * as Actions from '../Actions/Actions';
import Player from '../Components/PlayerObjects';

const util = require('util');
export default class BoardScreen extends Component {
  static navigationOptions = {
     title: 'Board',
     header: null
   };

  constructor() {
    super();

    this.state = {
        direction: 'column'
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
    	if(isPortrait()){
    		this.setState({
            direction: 'column'
        });
    	}else{
    		this.setState({
            direction: 'row'
        });
    	}
    });
	}

 render() {
   var {navigate} = this.props.navigation;
   var menu = 0x2630
   var backbutton = 0x2039
   return (
    <View style={{flex: 1, flexDirection: this.state.direction}}>
    	<View style={{flex: 20, backgroundColor: 'green'}} >
    		<View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 20,}}>
           <TouchableOpacity
         style={styles.button}
         onPress={() => {
          Alert.alert('You tapped the back button!');
          }}
       >
         <Text style={styles.texting}> {String.fromCharCode(backbutton)} </Text>
       </TouchableOpacity>

          <TouchableOpacity
          style={styles.button}
     			onPress={
          () =>  { navigate("Second")}} >
     			<Text style={styles.menustyle}> {String.fromCharCode(menu)} </Text>
     			</TouchableOpacity>
     		</View>
        <View style={{flex: 2, flexDirection: 'column', alignItems: 'flex-start', position: 'absolute', right: 0,
        justifyContent: 'space-between', backgroundColor: 'transparent', borderLeftWidth: 5, borderColor:'limegreen',
        height: Dimensions.get('screen').height/1.46, top: 70, width: (Dimensions.get('screen').width/6)}}>
          <PlayerComponent>
          </PlayerComponent>
        </View>
            <BoardComponent/>
          <DeckComponent>
          </DeckComponent>
     	</View>
      <View style={{flex: 0.04, backgroundColor: 'black'}}></View>
      <View style={{flexDirection: 'row', flex: 1.8, backgroundColor: 'steelblue'}}>
      <HandComponent/>
      </View>
    </View>
   );
 }

}

const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};

const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};

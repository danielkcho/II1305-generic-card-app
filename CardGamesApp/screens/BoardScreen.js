import React, { Component } from 'react';
import { Text, AppRegistry, Alert, Button, Dimensions, FlatList, Platform,
  Props, View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../assets/StyleSheets'
import FlipCard from '../Components/FlipCard';
import {HandComponent} from '../Components/HandComponent';
import {DeckComponent} from '../Components/DeckComponent';
import {cardifier, buildDeck} from '../functions/functions';
import {PlayingCard, Deck, Card} from '../Components/CardObjects';
import {BoardComponent} from '../Components/BoardComponent';
import handStore from '../Store/HandStore'
import MovableCard from '../Components/MovableCard';
import * as Actions from '../Actions/Actions';
import client from '../Multiplayer/Client';
import server from '../Multiplayer/Server';
import {Player} from '../Components/PlayerObjects';
import {PlayerComponent} from '../Components/PlayerComponent';

var net = require("net");

const util = require('util');
export default class BoardScreen extends Component {
  static navigationOptions = {
     title: 'Board',
     header: null
   };

  constructor() {
    super();
    this.state = {
        direction: 'column',
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

  componentWillUnmount(){
    Alert.alert("hej");
  }

  componentDidMount(){
    this.server = server;
    this.client = client;

   /*server.on('error', (error) => {
      Alert.alert('error ' + error);
    }); 
    */

    this.server.on('close', () => {
      Alert.alert('server close');
    });

    /*
    client.on('error', (error) => {
      Alert.alert('client error ' + error);
    });
    */
  }

 render() {
   var {navigate} = this.props.navigation;
   var menu = 0x2630
   var backbutton = 0x2039
   return (
    <View style={{flex: 1, flexDirection: this.state.direction}}>
    	<View style={{flex: 20, backgroundColor: 'green'}} >
    		<View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 1}}>
           <TouchableOpacity
         style={buttonstyle.button}
         onPress={() => {
          Alert.alert('You tapped the back button!');
          }}
       >
         <Text style={buttonstyle.texting}> {String.fromCharCode(backbutton)} </Text>
       </TouchableOpacity>         
     			
          <TouchableOpacity
          style={buttonstyle.button}
     			onPress={
          () =>  { navigate("Second")}} >
     			<Text style={buttonstyle.menustyle}> {String.fromCharCode(menu)} </Text>
     			</TouchableOpacity>
     		</View>
          <View style={{flex: 2, flexDirection: 'column', alignItems: 'flex-start', position: 'absolute', right: 0,
        justifyContent: 'space-between', backgroundColor: 'transparent', borderLeftWidth: 5, borderColor:'limegreen',
        height: Dimensions.get('screen').height/2, top: 70, width: (Dimensions.get('screen').width/6)}}>
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
const buttonstyle = StyleSheet.create({
 
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',


  },
  texting: {
    fontSize: 30,
  },
  menustyle: {
    fontSize: 20,
    paddingTop: 7,
  }

})
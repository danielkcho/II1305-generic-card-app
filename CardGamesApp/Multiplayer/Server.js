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
import { Player } from '../Components/PlayerObjects';
import dispatcher from "../Dispatcher/Dispatcher";

var net = require("net");
var serverPort = 9000;

var server = net.createServer((socket) => {
      Actions.addPlayer(new Player("player 1"));

      socket.on('data', (data) => {
        // Actions.addCardToBoard(cardifier(new PlayingCard(1,1,1,14)));
        dispatcher.dispatch(data);
      });

      /*socket.on('error', (error) => {
        Alert.alert('error ' + error);
      });*/

      socket.on('close', (error) => {
        Alert.alert('Server client closed ' + (error ? error : ''));
      });
}).listen(serverPort, () => {
      Alert.alert('Opened server on port 9000');
});

export default server;

import React, { Component } from 'react';
import { Text, AppRegistry, Alert, Button, Dimensions, FlatList, Platform,
  Props, View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../assets/StyleSheets'
import FlipCard from '../Components/FlipCard';
import {HandComponent} from '../Components/HandComponent';
import {DeckComponent} from '../Components/DeckComponent';
import {cardifier, buildDeck, jsonparser} from '../functions/functions';
import {PlayingCard, Deck, Card} from '../Components/CardObjects';
import {BoardComponent} from '../Components/BoardComponent';
import handStore from '../Store/HandStore'
import MovableCard from '../Components/MovableCard';
import * as Actions from '../Actions/Actions';
import { Player } from '../Components/PlayerObjects';
import dispatcher from '../Dispatcher/Dispatcher';
import playerStore from '../Store/PlayerStore';
require("json-circular-stringify");


var net = require("net");
var serverPort = 9000

var server = net.createServer((socket) => {
      if(!playerStore.containsAddress(socket.address().address)) {
        player = new Player("player 1");
        player.setAddress(socket.address().address);
        connection = new net.Socket();
        connection.connect(serverPort, socket.address().address);
        player.setConnection(connection);
        Actions.addPlayer(player);
      }
      socket.on('data', (data) => {
        json = JSON.parse(data);
        payload = jsonparser(json);
        dispatcher.dispatch(payload);
      });

      /*socket.on('error', (error) => {
        Alert.alert('error ' + error);
      });*/

      socket.on('close', (error) => {
        Alert.alert('Server client closed ' + (error ? error : ''));
      });
}).listen(serverPort, () => {
      Alert.alert('Opened server on: ' + server.address().address);
});

export default server;

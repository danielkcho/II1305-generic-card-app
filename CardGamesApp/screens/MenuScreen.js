import React, { Component } from 'react';
import {View,Text,FlatList,Button,Alert, TouchableOpacity, TextInput} from 'react-native';
import * as Actions from '../Actions/Actions';
import client from '../Multiplayer/Client';
import server from '../Multiplayer/Server';
import Dialog from 'react-native-dialog';

export default class MenuScreen extends Component {
  static navigationOptions = {
    title: "Menu",
  };
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible: false,
      ipAddress: "localhost"
    }
  }


  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  handleCancel = () => {
    this.setstate({dialogVisible: false});
  };

  handleSubmit = (value) => {
    this.setState({
      dialogVisible: false
    });

    client.connect(9000, value);
    Alert.alert("Connecting to %s", value);
  };

  render() {
    return(
      <View style={{paddingTop: 20,justifyContent:'center',alignItems:'center'}}>
        <Button
          color='green'
          onPress={
            () =>{
              Actions.createDeck();
            Alert.alert('Created a deck');
          }}
          title='Create a deck'
        />
        <View style={{paddingTop: 20,justifyContent:'center',alignItems:'center'}}>
        <Button
          color='green'
          onPress={
            () =>{
              Actions.shuffleDeck();
              Alert.alert('Shuffled deck!');
          }}
          title='Shuffle Deck'
        />
      </View>
      <View style={{paddingTop: 20,justifyContent:'center',alignItems:'center'}}>
        <Button
          color='green'
          onPress={
            () =>{
              Actions.createJoker();
              Alert.alert('Added a joker to the deck!');
          }}
          title='Add joker'
        />
      </View>
      <View>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Connect to a device</Dialog.Title>
          <Dialog.Description>
            Provide an IP address
          </Dialog.Description>
          <View><TextInput onChangeText = {(ipAddress) => this.setState({ipAddress})}></TextInput></View>
          <Dialog.Button label="Cancel" />
          <Dialog.Button label="Submit" 
            onPress = {
            () => {
              this.handleSubmit(this.state.ipAddress);
            }
          }/>
        </Dialog.Container>
        </View>
      <View style = {{paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
      <Button 
      color = 'green' 
      onPress = {
        () => {
          this.setState({
            dialogVisible: true
          });
        }}
        title = 'Connect device'
        />
      <View><Text> {this.state.ipAddress} </Text></View>
      </View>
      </View>
    )
  }
}

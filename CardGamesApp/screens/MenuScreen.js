import React, { Component } from 'react';
import {View,Text,FlatList,Button,Alert, TouchableOpacity, TextInput} from 'react-native';
import * as Actions from '../Actions/Actions';
import client from '../Multiplayer/Client';
import server from '../Multiplayer/Server';
import Dialog from 'react-native-dialog';
import Toast, {DURATION} from 'react-native-easy-toast';
import deckStore from '../Store/DeckStore';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

export default class MenuScreen extends Component {
  static navigationOptions = {
    title: "Menu",
  };
  constructor(props) {
    super(props);

    this.state = {
      dialogVisible: false,
      ipAddress: "localhost",
      getPress: false
    }
  }

  renderMethod(){
    this.setState({
      state: this.state
    })
  }

  _menu = null;
  _menuC = null;

  setMenuCRef = ref => {
    this._menuC = ref;
  };

  hideMenuC = () => {
    this._menuC.hide();
  };

  showMenuC = () => {
    this._menuC.show();
  };

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

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
    if(deckStore.getPressed()){
    return(
      <View style={{paddingTop: 20,paddingBottom: 20,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity
          style={{padding: 10}}
          onPress={()=>{
              Actions.createDeckRemote();
              this.renderMethod();
              this.refs.toast.show('Deck Created', DURATION.LENGTH_LONG);
          }}>
          <Text style={{fontSize:20, color:'green'}}>Create a deck</Text>
      </TouchableOpacity>
      <Toast
            ref="toast"
            style={{backgroundColor:'green'}}
            position='top'
            positionValue={250}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{color:'black'}}
        />


        <Menu
         ref={this.setMenuRef}
         button={<Text style ={{fontSize:20, color: 'green'}} onPress={this.showMenu}>Filter Deck</Text>}>
         <MenuItem onPress={()=>{
             this.showMenu();
         }}>Less Than</MenuItem>
          <MenuDivider />
         <MenuItem onPress={this.hideMenu}>Equals To</MenuItem>
         <MenuDivider />
         <MenuItem onPress={this.hideMenu}>Greater Than</MenuItem>
       </Menu>
        <TouchableOpacity
            style={{padding: 10,paddingBottom:1}}
            onPress={()=>{
                Actions.shuffleDeckRemote();
                this.state.getPress = true;
                this.refs.toast.show('Deck Shuffled', DURATION.LENGTH_LONG);
            }}>
            <Text style={{fontSize:20, color:'green'}}>Shuffle deck</Text>
        </TouchableOpacity>
        <Toast
              ref="toast"
              style={{backgroundColor:'green'}}
              position='top'
              positionValue={250}
              fadeInDuration={750}
              fadeOutDuration={1000}
              opacity={0.8}
              textStyle={{color:'black'}}
          />
        <Menu
          ref={this.setMenuCRef}
          button={<Text style ={{fontSize:20, color: 'green', paddingTop: 10}} onPress={this.showMenuC}>Clear board</Text>}>
          <MenuItem onPress={()=>
            {this.hideMenuC();
             Actions.clearAll();
             this.refs.toast.show('Cleared & added a new Deck', DURATION.LENGTH_LONG);
            }}>Confirm</MenuItem>
        </Menu>

         <Toast
                       ref="toast"
                       style={{backgroundColor:'green'}}
                       position='center'
                       positionValue={250}
                       fadeInDuration={750}
                       fadeOutDuration={1000}
                       opacity={0.8}
                       textStyle={{color:'black'}}
           />

        <TouchableOpacity
            style={{paddingTop: 10}}
            onPress={()=>{
              this.refs.toast.show('Joker Added', DURATION.LENGTH_LONG);
              Actions.createJokerRemote();
              this.renderMethod();
            }}>
            <Text style={{fontSize:20, color:'green'}}>Add Joker</Text>
        </TouchableOpacity>
        <Toast
            ref="toast"
            style={{backgroundColor:'green'}}
            position='top'
            positionValue={250}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{color:'black'}}
          />
        <Text> {deckStore.getJokerC()} </Text>
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
      <View style = {{paddingTop: 80, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
      onPress = {
        () => {
          this.setState({
            dialogVisible: true
          });
        }}>
        <Text style={{fontSize:20, color:'green'}}>Connect Device</Text>
      </TouchableOpacity>
      <View><Text> {this.state.ipAddress} </Text></View>
      </View>
      </View>

    )
  }
  else {
    return(
      <View style={{paddingTop: 20,justifyContent:'center',alignItems:'center'}}>

      <TouchableOpacity
          style={{padding: 1}}
          onPress={()=>{
              this.refs.toast.show('Deck Created', DURATION.LENGTH_LONG);
              Actions.createDeckRemote();
              this.renderMethod();
          }}>
          <Text style={{fontSize:20, color:'green'}}>Create a deck</Text>
      </TouchableOpacity>
      <Toast
          ref="toast"
          style={{backgroundColor:'green'}}
          position='top'
          positionValue={250}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{color:'black'}}
        />
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
      <View style = {{paddingTop: 80, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity 
      onPress = {
        () => {
          this.setState({
            dialogVisible: true
          });
        }}>
        <Text style={{fontSize:20, color:'green'}}>Connect Device</Text>
      </TouchableOpacity>
      <View><Text> {this.state.ipAddress} </Text></View>
      </View>
      </View>
    )

  }
  }
}

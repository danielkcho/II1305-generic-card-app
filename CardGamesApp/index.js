import React, { Component } from 'react';
import {View, Text, AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';
import BoardScreen from './screens/BoardScreen';
import MenuScreen from './screens/MenuScreen';


const Navigation = StackNavigator({
  First: {screen: BoardScreen},
  Second: {screen: MenuScreen},
});

export default Navigation;

AppRegistry.registerComponent('tcpTest', () => Navigation);
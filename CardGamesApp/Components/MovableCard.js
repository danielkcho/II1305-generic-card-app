import React, {Component} from 'react';
import {Alert, Animated, Dimensions, PanResponder, TouchableOpacity, PixelRatio} from 'react-native';
import {cardifier, buildDeck} from '../functions/functions';
import {PlayingCard, Card, Deck} from './CardObjects';
import * as Actions from '../Actions/Actions';
//import PropTypes from 'prop-types';
var PropTypes = require('prop-types');


export default class MovableCard extends Component {
    static propTypes =
    {card: PropTypes.object};


componentWillMount() {
	// can be created with a set possition
	this.state.pan.setValue({x: card.getPositionX()*Dimensions.get('screen').width, y: card.getPositionY()*Dimensions.get('screen').height});
	this._panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      //return true if user is swiping with stickyness adjusted for DPI, return false if it's a single click(less movement)
      return !(Math.abs(gestureState.dx) < (PixelRatio.get()*2) && Math.abs(gestureState.dy) < (PixelRatio.get()*2))
      },
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      //return true if user is swiping with stickyness adjusted for DPI, return false if it's a single click(less movement)
      return !(Math.abs(gestureState.dx) < (PixelRatio.get()*2) && Math.abs(gestureState.dy) < (PixelRatio.get()*2));
      },

    // Initially, set the value of x and y to 0 (the center of the screen)
    onPanResponderGrant: (e, gestureState) => {
      this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
      this.state.pan.setValue({x: 0, y: 0});
      // set depth so the last moved card is on top
      this.state.depth.setValue((Math.floor(Date.now()/100))%2147483647);
    },

    // When we drag/pan the object, set the delate to the states pan position
    onPanResponderMove: this._handleOnPanResponderMove.bind(this),

    onPanResponderRelease: (e, {vx, vy}) => {
        //for smothening
      this.state.pan.flattenOffset();
    	//Alert.alert(' ' + this.props.card.getPositionX() + ' ' + this.props.card.getPositionY() + ' ' + Dimensions.get('screen').width);
    	//^for error checking^
      Actions.removeCardFromBoardRemote(this.props.card);
      Actions.addCardToBoardRemote(this.props.card);
    }
  });
}
// this handles setting card variable for position so it can be transmitted between devices
_handleOnPanResponderMove(e,gestureState) {
    this.props.card.setPositionX((JSON.parse(JSON.stringify(this.state.pan.x)) / Dimensions.get('screen').width));
  	this.props.card.setPositionY((JSON.parse(JSON.stringify(this.state.pan.y)) / Dimensions.get('screen').height));
    return Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}]) (e, gestureState)
	};


      constructor() {
    super();

    this.state = {
        pan: new Animated.ValueXY(),
        depth: new Animated.Value()
    };

}
    render(){
    // Destructure the value of pan from the state
  let { pan } = this.state;
	// Calculate the x and y transform from the pan value
  let [translateX, translateY] = [pan.x, pan.y];

  // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
  let imageStyle = {zIndex: this.state.depth, height: 70.5, width:45, backgroundColor:'transparent',direction: 'ltr',position:'absolute',bottom: 70, alignItems: 'center',alignSelf:'baseline', transform: [{translateX}, {translateY}]};
       const {card} = this.props;
       if(this.props.card.isFlipped()){
          return(
                <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
                   {cardifier(this.props.card, 'back')}
                </Animated.View>
          )
       }else{
          return(
                <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
                   {cardifier(this.props.card, 'front')}
                </Animated.View>
          )
        }
       
        
    }
}

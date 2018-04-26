import React, { Component } from 'react';
import {Button, Dimensions, Text, View, StyleSheet} from 'react-native';
import dispatcher from '../Dispatcher/Dispatcher';
import * as Actions from '../Actions/Actions';
import playerStore from '../Store/PlayerStore';
import { Player } from '../Components/PlayerObjects';
import {Card} from '../Components/CardObjects';
//class for rendering player icons
export class PlayerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {players: []};
  }
// read the player store if it changes reread it
  componentWillMount(){
    playerStore.on("Change", () => {
      this.setState({
        players: playerStore.getAll()
      })
    })
  }

	render() {
		//generate a map with all players displaying their name and color
		array = this.state.players.map(function(player){
			return (
			<View style ={{width: (Dimensions.get('screen').width/6), height: 30, right: 1, backgroundColor: player.getColor()}}>
				<Text>
					{ player.getName() }
				</Text>
			</View>
			);
		});

		return array;
	}
}

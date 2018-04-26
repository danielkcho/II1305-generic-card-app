import { Text, AppRegistry, Alert, Button, Dimensions, FlatList, Platform,
  Props, View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent'
  },
  button: {
    marginBottom: 10,
    width: 65,
    height: 70,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  buttonText: {
    padding: 10,
    alignItems: 'center',
    color: 'black'
  },
  cardContainer: {
    alignItems: 'center',
    padding: 10,
    width: 80,
    height: 80
  },
  cardText: {
    color: 'white'
  },
  card: {
    width: 45,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center' ,
    borderColor: 'black',
    borderWidth: 2
  },
  cardback: {
  width: 45,
  height: 70,
  backgroundColor: '#973532',
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center' ,
  borderColor: '#D08273',
  borderWidth: 2
  },
  flipCard: {
    width: 45.5,
    height: 69.5
  },

  face: {
    flex: 1
  },

  back: {
    flex: 1
  }

})

export default styles;

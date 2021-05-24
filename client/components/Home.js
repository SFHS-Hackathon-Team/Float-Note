import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { createStackNavigator } from 'react-navigation';
import Map from './Map'

export default class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      notes: [],
    }
  }

  viewMap() {

    fetch('http://efda038c.ngrok.io/viewMap', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }

    })
    .then((response) =>
    {
    console.log(response)
    return response.json()
  })
    .then((responseJson) => {
      console.log(responseJson)
      this.setState({
        notes: responseJson
      })
    })
    .then(() => {this.props.navigation.navigate('Map', {notes: this.state.notes})})
    .catch((err) => {
      alert("error: ", err)
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Virtual Note Drop!</Text>
        <TouchableOpacity onPress={() => {this.viewMap()}}>
          <Text>View Map!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

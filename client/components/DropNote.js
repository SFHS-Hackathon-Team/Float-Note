import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

export default class DropNoteScreen extends React.Component {
  constructor(props){
    super(props)
    const { navigation } = this.props;
    const latitude = navigation.getParam('latitude', 0);
    const longitude = navigation.getParam('longitude', 0);
    this.state = {
      latitude: latitude,
      longitude: longitude,
      message: '',
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

  postNote(){
    axios.post('http://efda038c.ngrok.io/dropNote', {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        message: this.state.message
    })
    .then(res => {
      //console.log(res);
      this.viewMap()
    })
    .catch(e => console.log(e));
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput style={{width: '100%', height: '50%', borderColor: 'black', borderWidth: 1}} placeholder="Type here to leave a note" onChangeText={(message) => this.setState({message})}
        value={this.state.message}/>
        <TouchableOpacity onPress={(() => this.postNote())}>
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

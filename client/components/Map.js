import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput
} from 'react-native'
import {MapView, Location, Permissions} from 'expo'
import { createStackNavigator } from 'react-navigation';
import ViewNote from './ViewNote'
import DropNote from './DropNote'
import History from './History'
import Modal from 'react-native-modal';
import axios from 'axios';

console.disableYellowBox = true;

export default class MapScreen extends React.Component {
  constructor(props){
    super(props)
    const { navigation } = this.props;
    const notes = navigation.getParam('notes', []);
    this.state = {
      notes: notes,
      visibleModalMessage: null,
      visibleModalNote: null
    }
  }

  postNote(){
    //alert(this.state.longitude);
    //alert(this.state.latitude);
    axios.post('http://3c20a24f.ngrok.io/dropNote', {
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

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalNote = () => (
    <View style={{backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'}}>
      <TextInput placeholder="Type here to leave a note" onChangeText={(message) => this.setState({message})}/>
      <View style={{flexDirection: 'row'}}>
        {this._renderButton('Post', () => {this.postNote(); this.setState({ visibleModalNote: null })})}
        {this._renderButton('Close', () => this.setState({ visibleModalNote: null }))}
      </View>
      {/* <TextInput placeholder="Type here to leave a note" onChangeText={(message) => this.setState({message})}
      value={this.state.message}/>
      <TouchableOpacity onPress={(() => this.postNote())}>
        <Text>Post</Text>
      </TouchableOpacity> */}
    </View>
  );

  _renderModalMessage = (message) => (
    <View style={styles.modalContent}>
      <Text>{message}</Text>
      {this._renderButton('Close', () => this.setState({ visibleModalMessage: null }))}
    </View>
  );

  componentDidMount(){
    try{
      //console.log('asdf')
      this.setLocation()
    } catch(e){
      console.log(e)
    }
  }

  setLocation=async() => {

    //console.log('hi')
    let {status} = await Permissions.askAsync(Permissions.LOCATION)
    //console.log("status", status)
    if(status !== 'granted'){
      alert('permission denied')
      return;
    }

      let location = await Location.getCurrentPositionAsync({})
      //console.log("location", location)

      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })

      //set to local storage. asyncStorage
      try{
        await AsyncStorage.setItem('latitude', JSON.stringify(this.state.latitude))
        try{
          await AsyncStorage.setItem('longitude', JSON.stringify(this.state.longitude))
          try {
            this.viewMap();
          } catch (err) {
            console.log(err)
          }
        } catch(err) {
          console.log(err)
        }

      } catch (err) {
        console.log(err)
      }
  }

  viewMap() {

    fetch('http://3c20a24f.ngrok.io/viewMap', {
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
    .then(() => {this.setState({notes: this.state.notes})})
    .catch((err) => {
      alert("error: ", err)
      });
  }

  dropNote(){
    this.setState({ visibleModalNote: 2})
    //this.props.navigation.navigate('DropNote', {latitude: this.state.latitude, longitude: this.state.longitude})
  }

  viewNote(note){
    this.setState({ visibleModalMessage: 2 })
    //this.props.navigation.navigate('ViewNote', {note: note})
  }

  history(){
    this.props.navigation.navigate('History')
  }

  render(){
    return(
      <View style={{flex: 30, flexDirection: 'column'}}>
      <View style={{flex: 27}}>
        <MapView style={{
          width: '100%', height: '100%'}}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: .05,
            longitudeDelta: .05,
            }}>

            <MapView.Marker coordinate={{
              'latitude': this.state.latitude,
              'longitude': this.state.longitude,
            }}>
              <Image
                source={require('./../assets/human.png')}
                style={{width: 50, height: 50}}
              />
          </MapView.Marker>

            {this.state.notes.map((note, index) => {
              return(

                <MapView.Marker
                  onPress={(() => this.viewNote(note))}
                  key={index}
                  coordinate={{
                    'latitude': note.latitude,
                    'longitude': note.longitude
                  }}
                >
                  <Image
                    source={require('./../assets/emailBlue.png')}
                    style={{width: 35, height: 35}}
                  />
                  <Modal
                    isVisible={this.state.visibleModalMessage === 2}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                  >
                    {this._renderModalMessage(note.message)}
                  </Modal>

                  <Modal
                    isVisible={this.state.visibleModalNote === 2}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                  >
                    {this._renderModalNote()}
                  </Modal>
                </MapView.Marker>

              )
            })}
          </MapView>
        </View>
        <View style={{flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity >
              <Image
                source={require('./../assets/map.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.dropNote()}>
              <Image
                source={require('./../assets/drop.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.history()}>
              <Image
                source={require('./../assets/history.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
button: {
  backgroundColor: 'lightblue',
  padding: 12,
  margin: 16,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  borderColor: 'rgba(0, 0, 0, 0.1)',
},
modalContent: {
  backgroundColor: 'white',
  padding: 22,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  borderColor: 'rgba(0, 0, 0, 0.1)',
},
bottomModal: {
  justifyContent: 'flex-end',
  margin: 0,
},
});

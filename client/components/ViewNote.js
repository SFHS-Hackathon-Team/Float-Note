import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import { createStackNavigator } from 'react-navigation';
//import axios from 'axios';

export default class ViewNoteScreen extends React.Component {
  constructor(props){
    super(props)
    const { navigation } = this.props;
    const note = navigation.getParam('note', {});
    this.state = {
      note: note,
    }
  }

  render(){
    return(
      <View style={{marginTop: 50, marginLeft: 50}}>
        <Image
          source={require('./../assets/note.png')}
          style={{width: 50, height: 50}}
        />
        <Text style={{width: 100, height: 100}}>{this.state.note.message}</Text>
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

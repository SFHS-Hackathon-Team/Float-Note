import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import { createStackNavigator } from 'react-navigation';
import Map from './Map'
//import axios from 'axios';

export default class HistoryScreen extends React.Component {
  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
    }
  }

  mapScreen(){
    this.props.navigation.navigate('Map')
  }

  render(){
    return(
      <View style={{flex: 30}}>
        <View style={{flex: 27, backgroundColor: '#f3f3ff'}}>
          <View style={{flex: 2, flexDirection: 'vertical', marginTop: 15, marginLeft: 40, width: '75%', height: '25%', borderColor: 'black', borderWidth: 1,
          borderRadius: 5, backgroundColor: '#cfe2f3ff'}}>
            <Text> Date: 09-08-2018 // Time: 12:05pm </Text>
            <Text> Location: Google Headquarters </Text>
            <Text> spending time in a quiet place :) </Text>
          </View>
          <View style={{flex: 2, flexDirection: 'vertical', marginTop: 15, marginLeft: 40, width: '75%', height: '25%', borderColor: 'black', borderWidth: 1,
          borderRadius: 5, backgroundColor: '#cfe2f3ff'}}>
            <Text> Date: 09-08-2018 // Time: 12:49pm </Text>
            <Text> Location: Google Headquarters </Text>
            <Text> WAzzup </Text>
          </View>
          <View style={{flex: 2, flexDirection: 'vertical', marginTop: 15, marginLeft: 40, width: '75%', height: '25%', borderColor: 'black', borderWidth: 1,
          borderRadius: 5, backgroundColor: '#cfe2f3ff'}}>
            <Text> Date: 09-08-2018 // Time: 1:03pm </Text>
            <Text> Location: Google Headquarters </Text>
            <Text> are these elk trees? </Text>
          </View>
          <View style={{flex: 2, flexDirection: 'vertical', marginTop: 15, marginLeft: 40, width: '75%', height: '25%', borderColor: 'black', borderWidth: 1,
          borderRadius: 5, backgroundColor: '#cfe2f3ff'}}>
            <Text> Date: 09-08-2018 // Time: 2:44pm </Text>
            <Text> Location: Google Headquarters </Text>
            <Text> you're beautiful! keep up the good work! </Text>
          </View>
          <View style={{flex: 2, flexDirection: 'vertical', marginTop: 15, marginLeft: 40, width: '75%', height: '25%', borderColor: 'black', borderWidth: 1,
          borderRadius: 5, backgroundColor: '#cfe2f3ff'}}>
            <Text> Date: 09-08-2018 // Time: 3:56pm </Text>
            <Text> Location: Google Headquarters </Text>
            <Text> This Google place has pretty good food... </Text>
          </View>
          <View style={{flex: 2, flexDirection: 'vertical', marginTop: 15, marginLeft: 40, width: '75%', height: '25%', borderColor: 'black', borderWidth: 1,
          borderRadius: 5, backgroundColor: '#cfe2f3ff'}}>
            <Text> Date: 09-08-2018 // Time: 4:15pm </Text>
            <Text> Location: Google Headquarters </Text>
            <Text> migos 4 lyfe </Text>
          </View>
        </View>
        <View style={{flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.mapScreen()}>
              <Image
                source={require('./../assets/map.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity>
              <Image
                source={require('./../assets/drop.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity>
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
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

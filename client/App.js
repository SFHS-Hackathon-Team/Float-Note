import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from './components/Home';
import Map from './components/Map';
import ViewNote from './components/ViewNote';
import DropNote from './components/DropNote';
import History from './components/History';

export default App = createStackNavigator(
  {
    // Home: {
    //   screen: Home
    // },
    Map: {
      screen: Map
    },
    ViewNote: {
      screen: ViewNote
    },
    DropNote: {
      screen: DropNote
    },
    History: {
      screen: History,
      navigationOptions:  {
        title: '',
        headerLeft: null
      }
    }
  }, {initialRouteName: 'Map'}
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

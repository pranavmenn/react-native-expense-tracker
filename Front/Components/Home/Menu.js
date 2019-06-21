import { List, ListItem } from 'react-native-elements'
import React, { Component, Fragment } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from "react-native";

export default class Menu extends Component{
  render(){
    return(
      <View>
      <List>
      <ListItem title="History" />
      </List>
      </View>
    )
  }
}

AppRegistry.registerComponent('Menu', () => Menu);

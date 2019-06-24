import React, { Component, Fragment } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Alert
} from "react-native";
import axios from "react-native-axios";
import { Redirect, Link } from "react-router-native";
import { Input, Button } from "react-native-elements";

export default class Graph extends Component{
  render()
  {
    return(
      <View>
        <Text>Hello</Text>
      </View>
    )
  }
}

AppRegistry.registerComponent("Graph", () => Graph);

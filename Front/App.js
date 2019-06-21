/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AppRegistry } from "react-native";
import Layout from "./Components/Layout";

export default class App extends Component {
  render() {
    return <Layout />;
  }
}

AppRegistry.registerComponent("App", () => App);

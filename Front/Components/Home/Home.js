import React, { Component, Fragment } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Image,
  Alert
} from "react-native";
import { ListItem, Button, Header } from "react-native-elements";
import Menu from "./Menu";
import Icon from "react-native-vector-icons/FontAwesome5";

const list = [
  {
    name: "History",
    desc: "Click here to view your Expense history"
  },
  {
    name: "LogForm",
    desc: "Click here to log new expenses"
  }
];

export default class Home extends Component {
  static navigationOptions = { header: null };

  state = {
    page: 0
  };

  handleHistory = () => {
    this.setState({
      page: 1
    });
  };

  handleLog = () => {
    this.setState({
      page: 2
    });
  };

  render() {
    if (this.state.page == 1) {
      let username = this.props.navigation.getParam("user");
      this.props.navigation.navigate("History", { username: username });
    }

    if (this.state.page == 2) {
      let username = this.props.navigation.getParam("user");
      this.props.navigation.navigate("LogForm", { username: username });
    }

    return (
      <View>
        <Header
          leftComponent={{ icon: "menu", color: "#fff", onPress: ()=>Alert.alert("Pressed")}}
          centerComponent={{ text: "MY EXPENSES", style: { color: "#fff" } }}
          rightComponent={{ icon: 'exit-to-app', color: '#fff', onPress: ()=> this.props.navigation.navigate("Login")}}
        />

        <View style={{ flex: 1, marginTop: "20%", marginLeft: "15%" }}>
          <TouchableHighlight onPress={this.handleLog}>
            <Image
              source={require("../../images/download.jpg")}
              style={{ borderRadius: 25 }}
            />
          </TouchableHighlight>
          <Text />
          <Text onPress={this.handleLog}>
            Click here to Enter a new expense
          </Text>
          <Text />
          <TouchableHighlight onPress={this.handleHistory}>
            <Image
              source={require("../../images/images.jpg")}
              style={{ borderRadius: 25 }}
            />
          </TouchableHighlight>
          <Text />
          <Text onPress={this.handleHistory}>
            Click here to view your expenses
          </Text>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent("Home", () => Home);

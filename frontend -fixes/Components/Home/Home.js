import React, { Component, Fragment } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Image,
  Alert,
  ScrollView
} from "react-native";
import { ListItem, Button, Header } from "react-native-elements";
import Menu from "./Menu";
import Icon from "react-native-vector-icons/FontAwesome5";
import HamburgerMenu from "./HamburgerMenu";

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

  handleDate = () => {
    this.setState({
      page: 3
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

    if(this.state.page == 3) {
      let username = this.props.navigation.getParam("user");
      this.props.navigation.navigate("SearchDate", { username: username});
    }

    return (
      <ScrollView>
        <Header
          leftComponent={<HamburgerMenu navigation={this.props.navigation} />}
          centerComponent={{ text: "MY EXPENSES", style: { color: "#fff" } }}
          rightComponent={{
            icon: "exit-to-app",
            color: "#fff",
            onPress: () => this.props.navigation.navigate("Login")
          }}
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
              source={require("../../images/bills.jpg")}
              style={{ borderRadius: 25 }}
            />
          </TouchableHighlight>
          <Text />
          <Text onPress={this.handleHistory}>
            Click here to view your expenses
          </Text><Text />
        <TouchableHighlight onPress={this.handleDate}>
            <Image
              source={require("../../images/history.png")}
              style={{ borderRadius: 25 }}
            />
          </TouchableHighlight>
          <Text />
          <Text onPress={this.handleDate}>
            Click here to view your expenses by dates
          </Text>
        </View>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent("Home", () => Home);

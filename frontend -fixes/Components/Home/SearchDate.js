import React, { Component, Fragment } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Alert,
  ScrollView
} from "react-native";
import { Input, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import ExpenseByDate from "./ExpenseByDate";

export default class SearchDate extends Component {
  getData = () => {
    let user = this.props.navigation.getParam("username");
    if (user !== null) {
      fetch("http://192.168.10.47:4000/api/getData/" + user)
        .then(res => res.json())
        .then(resJson => {
          this.setState({
            expenses: resJson,
            loading: false
          });
        });
    }
  };

  state = {
    expenses: [],
    date: "",
    loading: true
  };

  render() {
    if (!this.state.loading) {
      return (
        <ExpenseByDate expenses={this.state.expenses} date={this.state.date} />
      );
    } else {
      return (
        <View
          style={{
            height: 100,
            marginTop: 100,
            display: "flex",
            flexDirection: "column",
            width: "100%"
          }}
        >
          <DatePicker
            date={this.state.date}
            placeholder="Select Date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            style={{ width: "100%" }}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
          <Text />
          <Text />
          <Button title="Search" type="solid"  onPress={this.getData} />
        </View>
      );
    }
  }
}

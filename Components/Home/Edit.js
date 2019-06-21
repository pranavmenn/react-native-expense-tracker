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
import { Input, Button } from "react-native-elements";

export default class Edit extends Component {
  state = {
    name: "",
    amount: "",
    message: ""
  };

  edit = () => {
    const obj = {
      amount: this.state.amount
    };
    axios
      .post(
        "http://192.168.10.47:4000/api/deleteData/" +
          this.props.navigation.getParam("expense"),
        obj
      )
      .then(res => {
        this.setState({
          expenses: res.data,
          message: "Edit Success"
        });
        Alert.alert("Edit Success");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={{ marginTop: "20%" }}>
        <TextInput
          name="name"
          placeholder="Expense Name"
          onChangeText={name => this.setState({ name })}
        />
        <Text />
        <TextInput
          name="amount"
          placeholder="Amount"
          onChangeText={amount => this.setState({ amount })}
        />
        <Text />
        <Button title="Edit" type="solid" onPress={this.edit} />
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

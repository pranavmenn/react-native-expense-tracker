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
  };

  edit = () => {
    const obj = {
      name: this.state.name,
      amount: this.state.amount
    };
    const expense = this.props.navigation.getParam("expense");
    console.log(expense);
    axios
      .post("http://192.168.10.47:4000/api/edit/"+expense._id, obj)
      .then(res => {
        this.setState({
          expenses: res.data,
        });
        Alert.alert("Edit Success. Reload History screen to see the changes.");
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
      </View>
    );
  }
}

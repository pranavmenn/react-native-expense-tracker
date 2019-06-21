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
import { ListItem, Button } from "react-native-elements";
import moment from "moment";
import axios from "react-native-axios";
import DatePicker from "react-native-datepicker";

export default class LogForm extends Component {
  state = {
    id: "",
    name: "",
    amount: "",
    redirect: false,
    loading: true,
    message: "",
    date: ""
  };

  handleSubmit = event => {
    let user = this.props.navigation.getParam("username");

    const { id, name, amount } = this.state;
    if (id != null || name != null || amount != null) {
      const formatted_date = moment(this.state.date).format("YYYY-MM-DD");
      console.log(formatted_date);
      axios
        .post("http://192.168.10.47:4000/api/putDataToDB/" + user, {
          sno: id,
          date: formatted_date,
          name: name,
          amount: amount
        })
        .then(response => {
          console.log(response);
          this.setState({ loading: false });
          Alert.alert("Saved Successfully");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert("Empty fields");
    }
  };

  render() {
    return (
      <View
        style={{
          marginTop: "20%",
          height: 100,
          marginTop: 100,
          display: "flex",
          flexDirection: "column",
          width: "100%"
        }}
      >
        <TextInput
          name="id"
          placeholder="Expense ID"
          onChangeText={id => this.setState({ id })}
        />
        <Text />
        <DatePicker
          date={this.state.date}
          placeholder="Select Date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          style={{width:'80%'}}
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />
        {/*}  <TextInput
          name="date"
          placeholder="Date"
          onChangeText={date => this.setState({ date })}
        />
        */}
        <Text />
        <TextInput
          name="name"
          placeholder="Expense Name"
          onChangeText={name => this.setState({ name })}
        />
        <Text />
        <TextInput
          name="amount"
          placeholder="Expense Amount"
          onChangeText={amount => this.setState({ amount })}
        />
        <Text />
        <Button title="Add Expense" type="solid" onPress={this.handleSubmit} />
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

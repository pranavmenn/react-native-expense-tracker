import React, { Component, Fragment } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput
} from "react-native";
import axios from "react-native-axios";
import { Redirect, Link } from "react-router-native";
import { Input, Button } from "react-native-elements";

export default class Register extends Component {
  state = {
    username: "",
    password: ""
  };

  register = () => {
    const { username, password } = this.state;
    axios
      .post("http://192.168.10.47:4000/api/register", {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res.data.message);
        this.message = res.data.message;
        alert(this.message);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
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
        <Text style={{ fontSize: 30, color: "#141823", marginLeft: '35%'}}>Register</Text>
        <Text />

        <TextInput
          name="username"
          placeholder="Username"
          onChangeText={username => this.setState({ username })}
          style={{ width: "80%" }}
        />
        <Text />

        <TextInput
          name="password"
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          style={{ width: "80%" }}
        />
        <Text />
        <Text />

        <Button title="Register" type="solid" onPress={this.register} />

        <View
          style={{
            height: 100,
            marginTop: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Text />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent("Register", () => Register);

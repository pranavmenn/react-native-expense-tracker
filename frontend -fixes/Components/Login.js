import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";
import axios from "react-native-axios";
import { Input, Button } from "react-native-elements";

export default class Login extends Component {
  static navigationOptions = { header: null }
  state = {
    users: [],
    username: "",
    password: "",
    loginStatus: 0
  };

  login = () => {
    const { username, password } = this.state;
    axios
      .post("http://192.168.10.47:4000/api/login", {
        username: username,
        password: password
      })
      .then(res => {
        if (res.data.success) {
          this.setState({
            loginStatus: 1
          });
          this.storeData();
        } else if (!res.data.success) {
          Alert.alert("Invalid Login");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  storeData = async () => {
    try {
      await AsyncStorage.setItem("username", this.state.username);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    if (this.state.loginStatus == 1) {
      this.props.navigation.navigate("Home", { user: this.state.username });
    }

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
        <Text style={{ fontSize: 30, color: "#141823", marginLeft: '40%'}}>Login</Text>
        <Text />
        <TextInput
          name="username"
          placeholder="Username"
          style={{ width: "80%" }}
          onChangeText={username => this.setState({ username: username, editable: true })}
        />
        <Text />
        <TextInput
          name="password"
          secureTextEntry={true}
          style={{ width: "80%" }}
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
        />
        <Text />
        <Text />
        <Button title="Login" type="solid" onPress={this.login} />

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
          <Text>Not registered? Click on the register tab below</Text>
        </View>
      </View>
    );
  }
}
AppRegistry.registerComponent("Login", () => Login);

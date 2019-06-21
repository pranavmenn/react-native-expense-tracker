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
import AsyncStorage from "@react-native-community/async-storage";
import axios from "react-native-axios";
import { Redirect, Link } from "react-router-native";
import { Input, Button } from "react-native-elements";
import TableData from "./TableData";

export default class History extends Component {
  state = {
    expenses: [],
    loading: false,
    current_page: 1,
    error: null,
    hasMore: true,
    edit: false,
    editExpense: []
  };

  componentDidMount() {
    return this.getData();
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  }

  edit = exp => {
    this.setState({
      editExpense: exp,
      edit: true
    });
  };

/*
without fetch
axios.get("http://192.168.10.47:4000/api/getData/" + user).then(res => {
      this.setState({ expenses: res.data, loading: false });
    });
*/

  getData = () => {
    let user = this.props.navigation.getParam("username");
    if (user !== null) {
      fetch("http://192.168.10.47:4000/api/getData/"+user).then(res=>res.json()).then((resJson) =>{
        this.setState({
          expenses: resJson,
          loading: false
        })
      })

    }
  };

  deleteHandler = (exp) => {
    console.log("Inside delete");
    axios
      .get("http://192.168.10.47:4000/api/deleteData/" + exp._id)
      .then(this.getData())
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.edit) {
      this.props.navigation.navigate("Edit", {
        expense: this.state.editExpense
      });
    }
    return (
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent) && this.state.hasMore) {
            this.getData();
          }
        }}
      >
        <TableData
          expenses={this.state.expenses}
          deleteHandler={this.deleteHandler}
          edit={this.edit}
        />
      </ScrollView>
    );
  }
}
AppRegistry.registerComponent("History", () => History);

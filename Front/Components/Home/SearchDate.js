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
import DatePicker from "react-native-datepicker";

export default class SearchDate extends COmponent{

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

  state = {
    expenses: [],
    date: "",
    loading:true
  }

  componentDidMount(){
    this.getData();
  }

  render(){
    if(!this.state.loading){
      return  <ExpenseByDate expense={this.state.expense} date={this.state.date} />;
      }
    else{
      return(
        <View>
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
        <Button title="Search" type="solid" onPress={this.getData} />


        </View>
      )
    }

  }
}

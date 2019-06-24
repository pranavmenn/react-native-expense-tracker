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
import { Redirect, Link } from "react-router-native";
import { Input, Button, Card } from "react-native-elements";
import { List, ListItem } from "react-native-elements";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
export default class TableData extends Component {
  render() {
    return (
      <View>
        {this.props.expenses.map((exp, i) => (
          <Card>
            <ListItem
              key={i}
              title={exp.name}
              subtitle={
                <View>
                  <Text>{exp.amount}</Text>
                  <Text>{moment(exp.date).format("YYYY-MM-DD")}</Text>
                </View>
              }
              rightAvatar={
                <View style={{ display: "flex" }}>
                  <Icon
                    name="trash"
                    size={25}
                    onPress={() => this.props.deleteHandler(exp)}
                    color="#900"
                  />
                  <Icon
                    name="edit"
                    size={25}
                    color="#200"
                    onPress={() => this.props.edit(exp)}
                  />
                </View>
              }
            />
          </Card>
        ))}
      </View>
    );
  }
}

AppRegistry.registerComponent("TableData", () => TableData);

import React, { Component, Fragment } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Alert,
  ScrollView,
  
} from "react-native";
import moment from 'moment';
import { List, ListItem, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class ExpenseByDate extends Component {

  render(){
    return(
      <View>
        {

          this.props.expenses && this.props.expenses.map((expense,i) => {
            let formatted_date=moment(this.props.date).format("YYYY-MM-DD");
            if(moment(expense.date).format("YYYY-MM-DD")==formatted_date){
              return(
                <Card>
                <ListItem
                  key={i}
                  title={expense.name}
                  subtitle={
                    <View>
                      <Text>{expense.amount}</Text>
                      <Text>{moment(expense.date).format("YYYY-MM-DD")}</Text>
                    </View>
                  }
                  rightAvatar={
                    <View style={{ display: "flex" }}>
                      <Icon
                        name="trash"
                        size={25}
                        color="#900"
                      />
                      <Icon
                        name="edit"
                        size={25}
                        color="#200"
                      />
                    </View>
                  }
                />

                </Card>
              )
            }
          })

        }
      </View>

    )
  }
}

import React, { Component } from "react";
import { Text, View, AppRegistry } from "react-native";
import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Login from "./Login";
import Register from "./Register";
import Icon from "react-native-vector-icons/FontAwesome5";
import Home from "./Home/Home";
import History from "./Home/History";
import Edit from "./Home/Edit";
import LogForm from "./Home/LogForm";
import { Button } from "react-native-elements";

const MainDrawer = createStackNavigator(
  {
    Login: {
      screen: createBottomTabNavigator({
        Login: {
          screen: Login,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name="lock" size={25} color={tintColor} />
            )
          }
        },
        Register: {
          screen: Register,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name="plus" size={25} color={tintColor} />
            )
          }
        }
      }),

    },

    mainFlow: {
      screen: createStackNavigator({
        Home: { screen: Home },
        History: {
          screen: History,
          navigationOptions: {
            title: "Expense History"
          }
        },
        LogForm: {
          screen: LogForm,
          navigationOptions: {
            title: "Add Expense"
          }
        }
      }),

      navigationOptions: {
        header: null
      }
    },
    Edit: {
      screen: Edit,
      navigationOptions: {
        title: "Edit Expense"
      }
    },

  },

  {
    intialRouteName: "Login"
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}
);

MainDrawer.navigationOptions = ({ navigation }) => {

  let tabBarVisible = false;
  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "Home") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

AppRegistry.registerComponent("MainDrawer", () => MainDrawer);
export default createAppContainer(MainDrawer);

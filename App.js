import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AddDeck from "./components/AddDeck";
import DecksList from "./components/DecksList";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Decks List">
        <Tab.Screen name="Decks List" component={DecksList} />
        <Tab.Screen name="Add Deck" component={AddDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <StatusBar style="auto" />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <MyTabs />
        </KeyboardAvoidingView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

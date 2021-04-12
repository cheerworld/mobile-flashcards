import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";

const Deck = (props) => {
  return (
    <View>
      <Text>Deck View</Text>
    </View>
  );
};

function mapStateToProps(state, { route }) {
  const { title, length } = route.params;
  console.log(title, length);
  return {
    state,
  };
}
export default connect(mapStateToProps)(Deck);

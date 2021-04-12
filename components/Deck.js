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
import ButtonLook from "./ButtonLook";
import TextButton from "./TextButton";

const Deck = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text>{props.length}</Text>
      <ButtonLook>
        Add Card
      </ButtonLook>
      <ButtonLook btnStyle={{backgroundColor:"#364f6b"}} textStyle={{color:"#f5f5f5"}}>
        Start Quiz
      </ButtonLook>
      <TextButton>
        Delete Deck
      </TextButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 30,
    color: "#364f6b",
    //wordBreak: "break-word",
  },
});

function mapStateToProps(state, { route }) {
  const { title, length } = route.params;
  console.log(title, length);
  return {
    deck: state[title],
    title,
    length,
  };
}
export default connect(mapStateToProps)(Deck);

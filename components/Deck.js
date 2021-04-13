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

  const addCard = () => {
    props.navigation.navigate("Add Card", {
      title: props.title,
    })
  }

  const deleteDeck = () => {
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text>{props.length} cards</Text>
      <ButtonLook onPress={addCard}>
        Add Card
      </ButtonLook>
      <ButtonLook
        onPress={startQuiz}
        btnStyle={{backgroundColor:"#364f6b"}}
        textStyle={{color:"#f5f5f5"}}>
        Start Quiz
      </ButtonLook>
      <TextButton onpress={deleteDeck}>
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

function mapStateToProps(state, { route, navigation }) {
  const { title } = route.params;
  console.log(title);
  return {
    title,
    length: state[title].questions.length,
    navigation,
  };
}
export default connect(mapStateToProps)(Deck);

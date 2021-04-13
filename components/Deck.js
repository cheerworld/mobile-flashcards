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
import { deleteDeck } from "../actions";

const Deck = (props) => {
  console.log(props);
  const addCard = () => {
    props.navigation.navigate("Add Card", {
      title: props.title,
    });
  };

  const deleteADeck = () => {
    console.log(props.title);
    props.dispatch(deleteDeck(props.title));

    props.navigation.navigate("Home");
  };

  const startQuiz = () => {};

  if (!props.deck) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text>{props.deck.questions.length} cards</Text>
      <ButtonLook onPress={addCard}>Add Card</ButtonLook>
      <ButtonLook
        onPress={startQuiz}
        btnStyle={{ backgroundColor: "#364f6b" }}
        textStyle={{ color: "#f5f5f5" }}
      >
        Start Quiz
      </ButtonLook>
      <TextButton onPress={deleteADeck} style={{ margin: 20 }}>
        Delete Deck
      </TextButton>
    </View>
  );
};

//function checkToRender(nextProps) {
//return nextProps.deck.length!==0;
//}

//const checkDeck = React.memo(Deck, checkToRender)

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
  console.log(state);
  console.log(state[title]);
  return {
    deck: state[title],
    title,
    navigation,
  };
}
export default connect(mapStateToProps)(Deck);

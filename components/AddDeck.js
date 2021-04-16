import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Button,
} from "react-native";
import ButtonLook from "./ButtonLook";
import { connect } from "react-redux";
import { addDeckAsync } from "../actions";

const AddDeck = (props) => {
  const [newDeck, onChangeText] = React.useState("");

  const createDeck = () => {
    const deck = newDeck;
    if (deck !== "") {
      const deckInfo = {
        [deck]: {
          title: deck,
          questions: [],
        },
      };
      //add new deck to store
      if (!props.state[deck]) {
        props.dispatch(addDeckAsync(deckInfo));
      }

      //route to this new deck view
      props.navigation.navigate("Deck", {
        title: deck,
      });
    }

    onChangeText("");

    //add new deck to AsyncStorage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>What is the title of your new deck?</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={newDeck}
        placeholder="Deck Title"
        maxLength={100}
      />
      <ButtonLook onPress={createDeck}>Create Deck</ButtonLook>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 20,
  },
});

function mapStateToProps(state) {
  //console.log(state);
  return {
    state,
  };
}
export default connect(mapStateToProps)(AddDeck);

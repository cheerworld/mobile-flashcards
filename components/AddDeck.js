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

const AddDeck = () => {
  const [newDeck, onChangeText] = React.useState("");

  const createDeck = () => {
    const deck = newDeck;
    if (deck !== "") {
      console.log(deck);
    }

    onChangeText("");
    //add new deck to store

    //add new deck to AsyncStorage

    //route to this new deck view
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>What is the title of your new deck?</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={newDeck}
        placeholder="Deck Title"
      />
      <ButtonLook onPress={createDeck}>Create Deck</ButtonLook>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderWidth: 1,
  },
});

export default AddDeck;

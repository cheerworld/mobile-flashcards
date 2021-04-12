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

const Item = ({ title, length }) => (
  <View style={styles.deck}>
    <Text style={styles.title}>{title}</Text>
    <Text>{length} cards</Text>
  </View>
);

const DecksList = (props) => {
  console.log(props.decks);

  const renderDeck = ({ item }) => (
    <Item title={item.title} length={item.questions.length} />
  );

  if (props.decks === null) {
    return (
      <View style={styles.container}>
        <Text>
          There is no decks in here right now, please click the Add Deck tab to
          add your deck.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={props.decks}
        renderItem={renderDeck}
        keyExtractor={item=>item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  deck: {
    backgroundColor: "#fc5185",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 30,
    color: "#f5f5f5",
    //wordBreak: "break-word",
  },
});

function mapStateToProps(state) {
  console.log(state, Object.keys(state).length === 0, Object.values(state));
  return {
    decks: Object.keys(state).length === 0 ? null : Object.values(state),
  };
}
export default connect(mapStateToProps)(DecksList);

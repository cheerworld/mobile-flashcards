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

const Item = ({ title, length, navigation }) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate("Deck", {
        title,
        length,
      })
    }
  >
    <View style={styles.deck}>
      <Text style={styles.title}>{title}</Text>
      <Text>{length} cards</Text>
    </View>
  </TouchableOpacity>
);

const DecksList = (props) => {
  console.log(props.decks, props.navigation);

  const renderDeck = ({ item }) => (
    <Item
      title={item.title}
      length={item.questions.length}
      navigation={props.navigation}
    />
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
        keyExtractor={(item) => item.title}
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

function mapStateToProps(state, { navigation }) {
  //console.log(state, navigation);
  return {
    decks: Object.keys(state).length === 0 ? null : Object.values(state),
    navigation,
  };
}
export default connect(mapStateToProps)(DecksList);

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DECKLIST, getDeckList } from "../actions";

const Item = ({ title, length, navigation }) => {
  const fade = useRef(new Animated.Value(1)).current;
  const deckPress = () => {
    Animated.sequence([
      Animated.timing(fade, {
        duration: 200,
        toValue: 1.04,
        useNativeDriver: false,
      }),
      Animated.spring(fade, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start();
    navigation.navigate("Deck", {
      title,
    });
  };

  return (
    <TouchableOpacity onPress={deckPress}>
      <Animated.View style={[styles.deck, { transform: [{ scale: fade }] }]}>
        <Text style={styles.title}>{title}</Text>
        <Text>{length} cards</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const DecksList = (props) => {
  console.log(props.decks, props.navigation);

  useEffect(() => {
    let isSubscribed = true;
    AsyncStorage.getItem(DECKLIST)
      .then((data) => {
        if(isSubscribed){
          const decks = JSON.parse(data);
          if (decks !== null) {
            props.dispatch(getDeckList(decks));
          }
        }
      })
      .catch((e) => console.error(e));
    return () => (isSubscribed = false);
  }, []);

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
    decksString: JSON.stringify(state),
    decks: Object.keys(state).length === 0 ? null : Object.values(state),
    navigation,
  };
}
export default connect(mapStateToProps)(DecksList);

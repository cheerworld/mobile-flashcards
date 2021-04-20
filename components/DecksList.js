import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DECKLIST, getDeckList } from "../actions";

const Item = ({ title, length, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Deck", {
          title,
        })
      }
    >
      <View style={styles.deck}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{length} cards</Text>
      </View>
    </TouchableOpacity>
  );
};

const DecksList = (props) => {
  console.log(props.decks, props.navigation);
  const isMounted = useRef(true);

  useEffect(() => {
    const abortController = new AbortController();

    const callAsync = () => {
      if (!isMounted.current) return;
      AsyncStorage.getItem(DECKLIST, () => ({
        signal: abortController.signal,
      }))
        .then((data) => {
          const decks = JSON.parse(data);
          if (isMounted.current && decks !== null) {
            props.dispatch(getDeckList(decks));
          }
        })
        .catch((e) => console.error(e));
    };

    callAsync();
    return () => {
      isMounted.current = false;
      abortController.abort();
    };
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
        <Text style={styles.noDeck}>
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
    marginTop: 20,
    marginBottom: 20,
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
    textAlign: "center",
    //wordBreak: "break-word",
  },
  count: {
    textAlign: "center",
    color: "#f5f5f5",
    fontSize: 20,
    marginTop: 10,
  },
  noDeck: {
    fontSize: 30,
    color: "#364f6b",
    marginLeft: 10,
    marginRight: 10,
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

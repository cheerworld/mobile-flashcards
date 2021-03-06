import React, { useEffect } from "react";
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
import { deleteDeckAsync } from "../actions";
import {
  clearLocalNotification,
  setLocalNotification
 } from "../utils/helpers";
 import PropTypes from 'prop-types';

const Deck = (props) => {
  useEffect(() => {
    if(!props.title) return;
    props.navigation.setOptions({
      title: props.title,
    })
  }, [])

  console.log(props);
  const addCard = () => {
    props.navigation.navigate("Add Card", {
      title: props.title,
    });
  };

  const deleteADeck = () => {
    console.log(props.title);
    props.dispatch(deleteDeckAsync(props.title));

    props.navigation.navigate("Home");
  };

  const startQuiz = () => {
    props.navigation.navigate("Quiz", {
      title: props.title,
    });

    if(Platform.OS==="ios" && Platform.OS==="android"){
      clearLocalNotification()
        .then(setLocalNotification)
    }
  };

  if (!props.deck) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.count}>{props.deck.questions.length} cards</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#364f6b",
  },
  count: {
    fontSize: 20,
    color: "#364f6b",
  }
});

function mapStateToProps(state, { route, navigation }) {
  const { title } = route.params;
  console.log(state);
  return {
    deck: state[title],
    title,
    navigation,
  };
}

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  deck:PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Deck);

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
import TextButton from "./TextButton";
import ButtonLook from "./ButtonLook";

const Quiz = (props) => {
  const [count, onChangeCount] = React.useState(0);
  const [correct, onChangeCorrect] = React.useState(0);
  const [flipQA, onChangeQA] = React.useState(true);
  const { deck, questions } = props;

  const flip = () => {
    onChangeQA(!flipQA);
  };

  const correctPress = () => {
    onChangeCount(count + 1);
    onChangeCorrect(correct + 1);
    onChangeQA(true);
  };

  const incorrectPress = () => {
    onChangeCount(count + 1);
    onChangeQA(true);
  };

  const restart = () => {
    onChangeCount(0);
    onChangeCorrect(0);
    onChangeQA(true);
  };

  const backToDeck = () => {
    props.navigation.navigate("Deck");
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>
          Sorry, you cannot take a quiz because there are no cards in the deck.
        </Text>
      </View>
    );
  }

  if (questions.length === count) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Score</Text>
        <Text>
          Correct Answer: {correct} out of {questions.length}
        </Text>
        <ButtonLook onPress={restart}>Restart Quiz</ButtonLook>
        <ButtonLook
          btnStyle={{ backgroundColor: "#364f6b" }}
          textStyle={{ color: "#f5f5f5" }}
          onPress={backToDeck}
        >
          Back to Deck
        </ButtonLook>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "flex-start" }}>{`${count + 1}/${
        questions.length
      }`}</Text>

      <Text style={styles.title}>
        {flipQA ? questions[count].question : questions[count].answer}
      </Text>
      <TextButton onPress={flip}>{flipQA ? "Question" : "Answer"}</TextButton>
      <ButtonLook onPress={correctPress}>Correct</ButtonLook>
      <ButtonLook
        btnStyle={{ backgroundColor: "#fc5185" }}
        textStyle={{ color: "#f5f5f5" }}
        onPress={incorrectPress}
      >
        Incorrect
      </ButtonLook>
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
  },
});

function mapStateToProps(state, { route, navigation }) {
  const { title } = route.params;
  return {
    deck: state[title],
    questions: state[title].questions,
    navigation,
  };
}
export default connect(mapStateToProps)(Quiz);

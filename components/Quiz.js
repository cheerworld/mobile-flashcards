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
import { shuffleArray } from "../utils/helpers";
import PropTypes from 'prop-types';

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
    shuffleArray(questions);
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
        <Text style={styles.noQuiz}>
          Sorry, you cannot take a quiz because there are no cards in the deck.
        </Text>
      </View>
    );
  }

  if (questions.length === count) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Score</Text>
        <Text style={styles.score}>
          Correct Answer: {correct} out of {questions.length}
        </Text>
        <View>
          <ButtonLook
            onPress={restart}
            btnStyle={{ backgroundColor: "#364f6b" }}
            textStyle={{ color: "#f5f5f5" }}
          >
            Restart Quiz
          </ButtonLook>
          <ButtonLook btnStyle={{ marginTop: 30 }} onPress={backToDeck}>
            Back to Deck
          </ButtonLook>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.count}>{`${count + 1}/${questions.length}`}</Text>
      <View style={styles.container}>
        <Text style={styles.title}>
          {flipQA ? questions[count].question : questions[count].answer}
        </Text>
        <TextButton onPress={flip}>{flipQA ? "Answer" : "Question"}</TextButton>
      </View>
      <View style={styles.button}>
        <ButtonLook onPress={correctPress}>Correct</ButtonLook>
        <ButtonLook
          btnStyle={{ backgroundColor: "#fc5185", marginTop: 30 }}
          textStyle={{ color: "#f5f5f5" }}
          onPress={incorrectPress}
        >
          Incorrect
        </ButtonLook>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 80,
  },
  noQuiz: {
    fontSize: 30,
    color: "#364f6b",
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 30,
    color: "#364f6b",
    fontWeight: "bold",
  },
  count: {
    alignSelf: "flex-start",
    paddingLeft: 10,
    marginTop: 10,
    fontSize: 20,
    color: "#364f6b",
  },
  score: {
    fontSize: 20,
    color: "#364f6b",
  },
});

function mapStateToProps(state, { route, navigation }) {
  const { title } = route.params;
  return {
    deck: state[title],
    questions: shuffleArray(state[title].questions),
    navigation,
  };
}

Quiz.propTypes = {
  questions: PropTypes.array.isRequired,
  deck:PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Quiz);

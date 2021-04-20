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
import { addCardAsync } from "../actions";

const AddCard = (props) => {
  const [question, onChangeQuestion] = React.useState("");
  const [answer, onChangeAnswer] = React.useState("");

  const submit = () => {
    if (question !== "" && answer !== "") {
      const newQQ = {
        question,
        answer,
      };
      props.dispatch(addCardAsync(props.title, newQQ));
      props.navigation.goBack();
    }
  };

  const qqLeft = 100 - question.length;
  const answerLeft = 100 - answer.length;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeQuestion}
        value={question}
        placeholder="Question"
        maxLength={100}
      />
      {qqLeft <= 10 && <Text style={styles.lengthLeft}>{qqLeft}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={onChangeAnswer}
        value={answer}
        placeholder="Answer"
        maxLength={100}
      />
      {answerLeft <= 10 && <Text style={styles.lengthLeft}>{answerLeft}</Text>}
      <ButtonLook onPress={submit}>Submit</ButtonLook>
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
    height: 50,
    width: 350,
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  lengthLeft: {
    fontSize: 20,
    color: "#fc5185",
  },
});

function mapStateToProps(state, { route, navigation }) {
  //console.log(state);
  const { title } = route.params;
  return {
    state,
    title,
    navigation,
  };
}

export default connect(mapStateToProps)(AddCard);

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  CheckBox,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const QuizScreen = ({ navigation, quiz, route }) => {
  const [numOfQuestion, setNumOfQuestion] = useState(0);
  const [answer, setAnswer] = useState({});
  const [checked, setChecked] = useState(false);
  const answerHandler = (no, ans) => {
    setChecked(!checked);
    console.log(answer);
    console.log(numOfQuestion + " " + answer[numOfQuestion] + " " + ans);
    if (answer[numOfQuestion] && answer[numOfQuestion][ans] === true)
      answer[numOfQuestion][ans] = false;
    else if (answer[numOfQuestion] && answer[numOfQuestion][ans] === false)
      answer[numOfQuestion][ans] = true;
    else if (answer[numOfQuestion]) {
      answer[numOfQuestion][ans] = true;
    } else {
      answer[numOfQuestion] = {};
      answer[numOfQuestion][ans] = true;
    }
    setAnswer(answer);
  };

  return (
    <View>
      {quiz && quiz.length > 0 ? (
        <View>
          <Text>Question number {numOfQuestion + 1}</Text>
          <Text> {quiz.length > 0 && quiz[numOfQuestion].text} </Text>
          <FlatList
            data={quiz[numOfQuestion].answer}
            renderItem={({ item }) => (
              <View style={styles.checkBoxContainer}>
                <View style={styles.answerText}>
                  <Text>{item}</Text>
                </View>

                <CheckBox
                  value={
                    (answer[numOfQuestion] && answer[numOfQuestion][item]) ||
                    false
                  }
                  onChange={() => answerHandler(numOfQuestion, item)}
                ></CheckBox>
              </View>
            )}
            keyExtractor={item =>
              `${numOfQuestion}_${quiz[numOfQuestion].answer.indexOf(item)}`
            }
          />
          {numOfQuestion < quiz.length - 1 ? (
            <View>
              <View>
                <Button
                  title="Next"
                  onPress={() => setNumOfQuestion(numOfQuestion + 1)}
                ></Button>
              </View>
              <View>
                <Button
                  title="Previos"
                  onPress={() => {
                    if (numOfQuestion > 0) setNumOfQuestion(numOfQuestion - 1);
                  }}
                ></Button>
              </View>

              <Button title="Submit"></Button>
            </View>
          ) : (
            <Button title="Submit"></Button>
          )}
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  quiz: state.questionBank.quiz
});

const mapDispatchToProps = {};

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: "row"
  },
  answerText: {
    width: 250
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);

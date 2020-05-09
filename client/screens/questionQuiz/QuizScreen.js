import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  CheckBox,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearQuiz } from "../../store/actions/questionBank";

const QuizScreen = ({ navigation, quiz, route, clearQuiz }) => {
  const [numOfQuestion, setNumOfQuestion] = useState(0);
  const [answer, setAnswer] = useState({});
  const [checked, setChecked] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const [timeSetted, setTimeSetted] = useState(false);
  let timeout = useRef(null);
  useEffect(() => {
    setTime(route.params.totalTime);

    timeout.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => {
      clearInterval(timeout.current);
      clearQuiz();
    };
  }, []);
  const answerHandler = (no, ans) => {
    // Bug
    setChecked(!checked);

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

  const submitHandler = () => {
    console.log(answer);
    let score = 0;
    for (let key in answer) {
      for (let item in answer[key]) {
        console.log(
          key,
          " ",
          item.charAt(0),
          " ",
          quiz[key].rightAnswer,
          " ",
          answer[key][item]
        );

        if (
          item.charAt(0) == quiz[key].rightAnswer &&
          answer[key][item] == true
        )
          score += 1;
      }
    }

    setScore(score);
    setSubmited(true);
  };

  const numTochar = (num) => {
    if (num === 0) return "a";
    else if (num === 1) return "b";
    else if (num === 2) return "c";
    else if (num === 3) return "d";
    else if (num === 4) return "e";
    return "f";
  };
  return (
    <View>
      {time >= 0 ? <Text>You have {time}s left</Text> : <Text>Time Out</Text>}
      {quiz && quiz.length > 0 ? (
        <View>
          <Text>Question number {numOfQuestion + 1}</Text>
          <Text>Chapter {quiz[numOfQuestion].chapter.name}</Text>
          <Text>Difficulty {quiz[numOfQuestion].difficulty}</Text>
          <Text></Text>
          <Text> {quiz.length > 0 && quiz[numOfQuestion].text} </Text>
          <FlatList
            data={quiz[numOfQuestion].answer}
            renderItem={({ item }) => (
              <View>
                <View style={styles.checkBoxContainer}>
                  <View style={styles.answerText}>
                    <Text>{item}</Text>
                  </View>

                  <CheckBox
                    value={
                      (answer[numOfQuestion] && answer[numOfQuestion][item]) ||
                      false
                    }
                    disabled={submited}
                    onChange={() => answerHandler(numOfQuestion, item)}
                  ></CheckBox>
                  {submited && (
                    <CheckBox
                      value={
                        numTochar(quiz[numOfQuestion].answer.indexOf(item)) ==
                          quiz[numOfQuestion].rightAnswer || false
                      }
                    ></CheckBox>
                  )}
                </View>
              </View>
            )}
            keyExtractor={(item) =>
              `${numOfQuestion}_${quiz[numOfQuestion].answer.indexOf(item)}`
            }
          />

          <View>
            <View>
              <Button
                title="Next"
                onPress={() => {
                  if (numOfQuestion < quiz.length - 1)
                    setNumOfQuestion(numOfQuestion + 1);
                }}
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

            <Button
              title="Submit"
              onPress={() => {
                clearInterval(timeout.current);
                setSubmited(true);
                submitHandler();
              }}
            ></Button>
          </View>
        </View>
      ) : (
        <Text>Loading</Text>
      )}
      {submited == true && (
        <View>
          <Text>Your Score is {score}</Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  quiz: state.questionBank.quiz,
});

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: "row",
  },
  answerText: {
    width: 250,
  },
});

export default connect(mapStateToProps, { clearQuiz })(QuizScreen);

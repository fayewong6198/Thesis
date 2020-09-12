import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  CheckBox,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableHighlight,
  Modal,
  Alert,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertComponent from "../../components/AlertComponent";
import axios from "axios";
import { IP } from "../../config/config";
import Constants from "expo-constants";

// action
import { clearQuiz } from "../../store/actions/questionBank";
import { createNote, getNote, clearNote, vote } from "../../store/actions/note";
import { MaterialIcons } from "@expo/vector-icons";

import {
  COLOR_SECONDARY,
  COLOR_PRIMARY,
  COLOR_BLUE,
  COLOR_BLUE_DARK,
} from "../../config/color";

const QuizScreen = ({
  navigation,
  quiz,
  route,
  clearQuiz,
  note,
  createNote,
  getNote,
  clearNote,
  user,
  vote,
}) => {
  const [numOfQuestion, setNumOfQuestion] = useState(0);
  const [answer, setAnswer] = useState({});
  const [checked, setChecked] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [time, setTime] = useState(20);
  const [timeSetted, setTimeSetted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [texts, setTexts] = useState([]);
  const [pos, setPos] = useState(0);
  const [realTexts, setRealTexts] = useState(null);
  const [term, setTerm] = useState(null);
  const [noteNumber, setNoteNumber] = useState(0);

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

  useEffect(() => {
    let textss = {};
    let textViews = {};
    for (let i = 0; i < quiz.length; i++) {
      textss[i] = quiz[i].text.split(" ");
      textViews[i] = [];
      for (let j = 0; j < textss[i].length; j++) {
        textViews[i].push(
          <Text
            style={{
              color: COLOR_BLUE_DARK,
              fontWeight: "bold",
            }}
            key={j}
            onPress={async () => {
              try {
                setPos(j);
                getNote(showText(textss[i][j]));
                setTerm(showText(textss[i][j]));
                setModalVisible(true);
              } catch (error) {
                Alert.alert("Error");
              }
            }}
          >
            <Text> {textss[i][j]} </Text>
          </Text>
        );
      }
    }

    setRealTexts(textss);
    setTexts(textViews);
  }, [quiz]);
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
    let ttScore = 0;
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
        ) {
          console.log("cc");

          score += quiz[key].difficulty;
          console.log(quiz[key].difficulty);
          console.log(score);
        }
        ttScore += quiz[key].difficulty;
      }
    }

    setScore(score);
    setTotalScore(ttScore);
    setSubmited(true);
  };

  const showText = (text) => {
    console.log(text.length);
    let result = "";
    // Only alow number and character
    for (let i = 0; i < text.length; i++) {
      console.log(i);
      if (
        (text.charCodeAt(i) > 47 && text.charCodeAt(i) < 58) ||
        (text.charCodeAt(i) > 64 && text.charCodeAt(i) < 91) ||
        (text.charCodeAt(i) > 96 && text.charCodeAt(i) < 123) ||
        text.charCodeAt(i) === 40 ||
        text.charCodeAt(i) === 41
      ) {
        result += text[i];
      }
    }
    return result;
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <AlertComponent></AlertComponent>
        {realTexts &&
          Object.keys(realTexts).length !== 0 &&
          realTexts.constructor === Object && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.exit}>
                    <MaterialIcons
                      name="cancel"
                      size={24}
                      color="black"
                      onPress={() => {
                        setNoteNumber(0);
                        clearNote();
                        setModalVisible(!modalVisible);
                      }}
                    />
                  </View>

                  <Text style={styles.modalText}> {term}</Text>

                  <View style={styles.modalMainContent}>
                    <View
                      onPress={() => {
                        if (noteNumber > 0) {
                          setNoteNumber(noteNumber - 1);
                          console.log(noteNumber);
                        }
                      }}
                      style={{ flex: 1 }}
                    >
                      <MaterialIcons
                        name="navigate-before"
                        size={24}
                        color="black"
                      />
                    </View>
                    <View style={styles.modalContent}>
                      {note &&
                        note.length > 0 &&
                        note[noteNumber].images &&
                        note[noteNumber].images.length > 0 && (
                          <View style={styles.image}>
                            <Image
                              source={{
                                uri: `${IP}:5000/uploads/${note[noteNumber].images[0].url}`,
                              }}
                              style={{
                                width: 200,
                                height: 200,
                                borderRadius: 100,
                              }}
                            ></Image>
                          </View>
                        )}
                      {note && note.length > 0 ? (
                        <Text> {note[noteNumber].text}</Text>
                      ) : (
                        <Text>Note is not available</Text>
                      )}
                    </View>
                    <View
                      onPress={() => {
                        if (noteNumber < note.length - 1) {
                          setNoteNumber(noteNumber + 1);
                          console.log(noteNumber);
                        }
                      }}
                      style={{ flex: 1 }}
                    >
                      <MaterialIcons
                        name="navigate-next"
                        size={24}
                        color="black"
                      />
                    </View>
                  </View>

                  <View style={styles.next_previous}>
                    <View style={styles.vote}>
                      <MaterialIcons
                        name="thumb-up"
                        size={24}
                        color={COLOR_PRIMARY}
                        onPress={() => {
                          vote(term, note[noteNumber].user, {
                            action: "upVote",
                          });
                        }}
                      />
                      <Text style={styles.upvoteText}>
                        {note &&
                          note[noteNumber] &&
                          note[noteNumber].votes &&
                          note[noteNumber].votes.filter(
                            (vote) => vote.action === "upVote"
                          ).length}
                      </Text>
                    </View>
                    <View style={styles.vote}>
                      <MaterialIcons
                        name="thumb-down"
                        size={24}
                        color={COLOR_SECONDARY}
                        onPress={() => {
                          vote(term, note[noteNumber].user, {
                            action: "downVote",
                          });
                        }}
                      />
                      <Text style={styles.downvoteText}>
                        {note &&
                          note[noteNumber] &&
                          note[noteNumber].votes &&
                          note[noteNumber].votes.filter(
                            (vote) => vote.action === "downVote"
                          ).length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.next_previous}>
                    <TouchableHighlight
                      style={{
                        ...styles.openButton,
                      }}
                      onPress={() => {
                        if (note.length > 0) {
                          createNote(term, { text: note[noteNumber].text });
                        } else {
                          createNote(term, { text: "" });
                        }
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>Add to Note</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        <View style={styles.time}>
          {time >= 0 ? (
            <Text>
              You have
              <Text
                style={{
                  color: COLOR_SECONDARY,
                  fontWeight: "bold",
                }}
              >
                {time}s
              </Text>
              left
            </Text>
          ) : (
            <Text>Time Out</Text>
          )}
        </View>
        {quiz && quiz.length > 0 ? (
          <View style={styles.info}>
            <Text>
              Question number {numOfQuestion + 1}/{quiz.length}
            </Text>
            <Text>Chapter {quiz[numOfQuestion].chapter.name}</Text>
            <Text>Difficulty {quiz[numOfQuestion].difficulty}</Text>
            <Text></Text>

            <View style={styles.textContainer}>
              {quiz.length > 0 && texts[numOfQuestion]}
            </View>

            <View style={styles.mainContent}>
              <TouchableHighlight
                onPress={() => {
                  if (numOfQuestion > 0) setNumOfQuestion(numOfQuestion - 1);
                }}
                style={{ flex: 1 }}
              >
                <MaterialIcons name="navigate-before" size={24} color="black" />
              </TouchableHighlight>
              <View
                style={{
                  flex: 10,
                  padding: 10,
                }}
              >
                <FlatList
                  data={quiz[numOfQuestion].answer}
                  renderItem={({ item }) => (
                    <View>
                      <View style={styles.checkBoxContainer}>
                        <View style={styles.answerText}>
                          <Text> {item}</Text>
                        </View>
                        <CheckBox
                          value={
                            (answer[numOfQuestion] &&
                              answer[numOfQuestion][item]) ||
                            false
                          }
                          disabled={submited}
                          onChange={() => answerHandler(numOfQuestion, item)}
                        ></CheckBox>
                        {submited && (
                          <CheckBox
                            value={
                              numTochar(
                                quiz[numOfQuestion].answer.indexOf(item)
                              ) == quiz[numOfQuestion].rightAnswer || false
                            }
                          ></CheckBox>
                        )}
                      </View>
                    </View>
                  )}
                  keyExtractor={(item) =>
                    `${numOfQuestion}_${quiz[numOfQuestion].answer.indexOf(
                      item
                    )}`
                  }
                />
              </View>
              <TouchableHighlight
                onPress={() => {
                  if (numOfQuestion < quiz.length - 1)
                    setNumOfQuestion(numOfQuestion + 1);
                }}
                style={{ flex: 1 }}
              >
                <MaterialIcons name="navigate-next" size={24} color="black" />
              </TouchableHighlight>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                  clearInterval(timeout.current);
                  setSubmited(true);
                  submitHandler();
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : (
          <Text>Loading</Text>
        )}
        {submited == true && (
          <View style={styles.submited}>
            <TouchableHighlight
              style={styles.seeAnswerContainer}
              onPress={() =>
                navigation.push("QuestionComment", {
                  id: quiz[numOfQuestion]._id,
                  text: quiz[numOfQuestion].text,
                })
              }
            >
              <Text style={styles.seeAnswer}>See answer</Text>
            </TouchableHighlight>

            <Text>Your Score is</Text>
            <Text style={styles.score}>
              {score}/ {totalScore}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  quiz: state.questionBank.quiz,
  note: state.note.notes,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {},
  checkBoxContainer: {
    flexDirection: "row",
  },
  answerText: {
    width: "70%",
  },
  next_previous: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 5,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  seeAnswerContainer: {
    paddingVertical: 10,
    justifyContent: "center",
  },
  seeAnswer: {
    color: "blue",
    textAlign: "center",
  },
  modalMainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  modalContent: {
    flex: 6,
    paddingBottom: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  upvoteText: {
    color: COLOR_PRIMARY,
  },
  downvoteText: {
    color: COLOR_SECONDARY,
  },
  vote: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  exit: {
    marginTop: -20,
    marginRight: -20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  mainContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submited: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    fontSize: 100,
    color: COLOR_PRIMARY,
  },
  info: {
    padding: 10,
  },
  time: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default connect(mapStateToProps, {
  clearQuiz,
  createNote,
  getNote,
  clearNote,
  vote,
})(QuizScreen);

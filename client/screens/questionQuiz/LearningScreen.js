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
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertComponent from "../../components/AlertComponent";
import axios from "axios";
//action
import {
  clearQuiz,
  submitQuiz,
  getUserChapter,
  generateQuiz,
} from "../../store/actions/questionBank";
import { createNote, getNote, clearNote, vote } from "../../store/actions/note";
import { MaterialIcons } from "@expo/vector-icons";
import {
  COLOR_SECONDARY,
  COLOR_PRIMARY,
  COLOR_BLUE,
  COLOR_BLUE_DARK,
} from "../../config/color";
import { setAlert } from "../../store/actions/alert";

const LearnScreen = ({
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
  userChapter,
  submitQuiz,
  getUserChapter,
  generateQuiz,
}) => {
  const [numOfQuestion, setNumOfQuestion] = useState(0);
  const [answer, setAnswer] = useState({});
  const [checked, setChecked] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const [timeSetted, setTimeSetted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [texts, setTexts] = useState([]);
  const [pos, setPos] = useState(0);
  const [realTexts, setRealTexts] = useState(null);
  const [term, setTerm] = useState(null);
  const [noteNumber, setNoteNumber] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [start, setStart] = useState(false);
  const { questionBankId, chapter } = route.params;

  let timeout = useRef(null);
  useEffect(() => {
    setTime(route.params.totalTime);
    getUserChapter(questionBankId, chapter);

    timeout.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => {
      clearInterval(timeout.current);
      clearQuiz();
    };
  }, [start]);

  useEffect(() => {
    let textss = {};
    let textViews = {};
    for (let i = 0; i < quiz.length; i++) {
      textss[i] = quiz[i].text.split(" ");
      textViews[i] = [];
      for (let j = 0; j < textss[i].length; j++) {
        textViews[i].push(
          <Text
            style={{ color: COLOR_BLUE_DARK, fontWeight: "bold" }}
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
            <Text>{textss[i][j]} </Text>
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

  const E = (user_elo, diff) => {
    return 1 / (1 + Math.pow(10, -(user_elo - diff) / 4));
  };
  const submitHandler = () => {
    let score = 0;
    let total_score = 0;
    let correct_num = 0;
    let wrong_num = 0;
    let max_score = 0;
    if (userChapter.elo == null) {
      console.log("userChapter is null");
      for (let key in answer) {
        for (let item in answer[key]) {
          if (answer[key][item] == true) {
            max_score += quiz[key].difficulty;
          }
          if (
            item.charAt(0) == quiz[key].rightAnswer &&
            answer[key][item] == true
          ) {
            score += quiz[key].difficulty;
            correct_num += 1;
          } else {
            wrong_num += 1;
          }

          total_score += quiz[key].difficulty;
        }
      }
      setMaxScore(max_score);
      setScore(score);
      setSubmited(true);

      let r_oop = total_score / (quiz.length + 1);
      let r_post = r_oop + (correct_num - wrong_num) / (quiz.length + 1);
      let body = {};
      body.questionBank = quiz[0].questionBank;
      body.chapter = quiz[0].chapter;
      body.elo = r_post;
      submitQuiz(body);
    } else {
      console.log(1);
      let r_pre = userChapter.elo;
      let S = 0;
      let Sexp = 0;
      for (let key in answer) {
        console.log(2);
        for (let item in answer[key]) {
          console.log(3);
          if (answer[key][item] == true) {
            if (quiz[key] && quiz[key].difficulty) {
              max_score += quiz[key].difficulty;
            } else {
              max_score += 2.5;
            }
          }
          if (
            item.charAt(0) == quiz[key].rightAnswer &&
            answer[key][item] == true
          ) {
            correct_num += 1;
            score += quiz[key].difficulty;
          } else {
            wrong_num += 1;
          }
          Sexp += E(r_pre, quiz[key].difficulty);

          total_score += quiz[key].difficulty;
        }
      }
      console.log(4);
      let body = {};
      body.questionBank = quiz[0].questionBank;
      body.chapter = quiz[0].chapter;
      console.log("Score expected");
      console.log(S);
      console.log(Sexp);
      body.elo = r_pre + (correct_num - Sexp) / (quiz.length + 1);
      setScore(score);

      setMaxScore(max_score);
      setSubmited(true);

      submitQuiz(body);
    }
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
    <View>
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

                <Text style={styles.modalText}>{term}</Text>

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
                    {note && note.length > 0 ? (
                      <Text>{note[noteNumber].text}</Text>
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
            <Text style={{ color: COLOR_SECONDARY, fontWeight: "bold" }}>
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
            <View style={{ flex: 10, padding: 10 }}>
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
                          (answer[numOfQuestion] &&
                            answer[numOfQuestion][item]) ||
                          false
                        }
                        disabled={submited}
                        onChange={() => answerHandler(numOfQuestion, item)}
                      ></CheckBox>

                      {true && (
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
                  `${numOfQuestion}_${quiz[numOfQuestion].answer.indexOf(item)}`
                }
              />
            </View>
            <TouchableHighlight
              onPress={() => {
                if (numOfQuestion < quiz.length - 1)
                  setNumOfQuestion(numOfQuestion + 1);
              }}
              style={{
                flex: 1,
              }}
            >
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            {submited == false ? (
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
            ) : (
              <View style={styles.buttonContainer2}>
                <View style={styles.buttonContainer}>
                  <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                      getUserChapter(questionBankId, chapter);
                      setAnswer({});
                      setSubmited(false);
                      setNumOfQuestion(0);
                      setStart(!start);
                      generateQuiz(
                        { [chapter]: true },
                        questionBankId,
                        2.5,
                        100,
                        true
                      );
                      setTime(route.params.totalTime);
                    }}
                  >
                    <Text style={styles.textStyle}>Do the test again</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Text style={styles.textStyle}>Go back</Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}
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
          <Text>Your elo now is {userChapter.elo}</Text>
          <Text>Your Score is </Text>
          <Text style={styles.score}>
            {score} / {maxScore}
          </Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  quiz: state.questionBank.quiz,
  note: state.note.notes,
  userChapter: state.questionBank.userChapter,
});

const styles = StyleSheet.create({
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
  buttonContainer2: {
    padding: 5,
  },
});

export default connect(mapStateToProps, {
  clearQuiz,
  createNote,
  getNote,
  clearNote,
  vote,
  submitQuiz,
  generateQuiz,
  getUserChapter,
})(LearnScreen);

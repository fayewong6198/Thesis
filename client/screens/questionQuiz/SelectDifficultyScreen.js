import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

import { connect } from "react-redux";
import {
  loadChapter,
  generateQuiz,
  getQuesionWhileDoingQuiz,
  getUserChapter,
} from "../../store/actions/questionBank";

import AlertComponent from "../../components/AlertComponent";
import { COLOR_BLUE, COLOR_PRIMARY, COLOR_SECONDARY } from "../../config/color";

const SelectDifficultyScreen = ({
  route,
  navigation,
  generateQuiz,
  loadChapter,
  getQuesionWhileDoingQuiz,
  userChapter,
  getUserChapter,
}) => {
  const { chapter, questionBankId } = route.params;

  useEffect(() => {
    getUserChapter(questionBankId, chapter);
  }, []);
  return (
    <View>
      <AlertComponent></AlertComponent>
      {userChapter != null && userChapter.elo == null ? (
        <View style={styles.buttonContainer}>
          <Text> {userChapter.elo}</Text>
          <TouchableHighlight
            style={[
              styles.button,
              {
                backgroundColor: COLOR_PRIMARY,
              },
            ]}
            onPress={() => {
              // getQuesionWhileDoingQuiz(chapter);
              generateQuiz(
                {
                  [chapter]: true,
                },
                questionBankId,
                2.5,
                100,
                true
              );
              navigation.replace("Learn", {
                no: 0,
                totalTime: 100,
                questionBankId,
                chapter,
              });
            }}
          >
            <Text style={styles.textStyle}>Do a brief test</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={[
              styles.button,
              {
                backgroundColor: COLOR_PRIMARY,
              },
            ]}
            onPress={() => {
              // getQuesionWhileDoingQuiz(chapter);
              generateQuiz(
                {
                  [chapter]: true,
                },
                questionBankId,
                2.5,
                100,
                true
              );
              navigation.replace("Learn", {
                no: 0,
                totalTime: 100,
                questionBankId,
                chapter,
              });
            }}
          >
            <Text style={styles.textStyle}>
              {userChapter && Math.round(userChapter.elo * 100) / 100}/ 10
            </Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  chapters: state.questionBank.chapters,
  userChapter: state.questionBank.userChapter,
});

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default connect(mapStateToProps, {
  loadChapter,
  generateQuiz,
  getQuesionWhileDoingQuiz,
  getUserChapter,
})(SelectDifficultyScreen);

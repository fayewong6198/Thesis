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
} from "../../store/actions/questionBank";

import AlertComponent from "../../components/AlertComponent";
import { COLOR_BLUE, COLOR_PRIMARY, COLOR_SECONDARY } from "../../config/color";

const SelectDifficultyScreen = ({
  route,
  navigation,
  generateQuiz,
  loadChapter,
  getQuesionWhileDoingQuiz,
}) => {
  const { chapter, questionBankId } = route.params;

  return (
    <View>
      <AlertComponent></AlertComponent>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={[styles.button, { backgroundColor: COLOR_BLUE }]}
          onPress={() => {
            // getQuesionWhileDoingQuiz(chapter);
            generateQuiz({ [chapter]: true }, 1.5);
            navigation.replace("Learn", { no: 0, totalTime: 500 });
          }}
        >
          <Text style={styles.textStyle}>Easy</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={[styles.button, { backgroundColor: COLOR_PRIMARY }]}
          onPress={() => {
            // getQuesionWhileDoingQuiz(chapter);
            generateQuiz({ [chapter]: true }, questionBankId, 2.5, 100, true);
            navigation.replace("Learn", { no: 0, totalTime: 500 });
          }}
        >
          <Text style={styles.textStyle}>Medium</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={[styles.button, { backgroundColor: COLOR_SECONDARY }]}
          onPress={() => {
            // getQuesionWhileDoingQuiz(chapter);
            generateQuiz({ [chapter]: true }, 3.5);
            navigation.replace("Learn", { no: 0, totalTime: 500 });
          }}
        >
          <Text style={styles.textStyle}>Hard</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  chapters: state.questionBank.chapters,
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
})(SelectDifficultyScreen);

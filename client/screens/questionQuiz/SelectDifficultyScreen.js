import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

import { connect } from "react-redux";
import { loadChapter, generateQuiz } from "../../store/actions/questionBank";

import AlertComponent from "../../components/AlertComponent";

const SelectDifficultyScreen = ({
  route,
  navigation,
  generateQuiz,
  loadChapter,
}) => {
  const chapter = route.params.chapter;

  return (
    <View>
      <AlertComponent></AlertComponent>
      <View style={styles.buttonContainer}>
        <Button
          title="Easy"
          onPress={() => {
            generateQuiz({ [chapter]: true }, 1.5);
            navigation.replace("Quiz", { no: 0, totalTime: 500 });
          }}
        ></Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Medium"
          onPress={() => {
            generateQuiz({ [chapter]: true }, 2.5);
            navigation.replace("Quiz", { no: 0, totalTime: 500 });
          }}
        ></Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Hard"
          onPress={() => {
            generateQuiz({ [chapter]: true }, 3.5);
            navigation.replace("Quiz", { no: 0, totalTime: 500 });
          }}
        ></Button>
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
});

export default connect(mapStateToProps, { loadChapter, generateQuiz })(
  SelectDifficultyScreen
);

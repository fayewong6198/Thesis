import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import { COLOR_SECONDARY, COLOR_PRIMARY } from "../../config/color";

const OptionsScreen = ({ route, navigation }) => {
  const { questionBankId } = route.params;

  useEffect(() => {
    console.log(questionBankId);
  });

  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() =>
            navigation.push("SelectChapter", { questionBankId: questionBankId })
          }
        >
          <Text style={styles.textStyle}>Doing Quiz</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.secondaryButton}
          onPress={() =>
            navigation.push("Prepare", { questionBankId: questionBankId })
          }
        >
          <Text style={styles.textStyle}>Exam test</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    chapters: state.questionBank.chapters,
  };
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  button: {
    width: 50,
  },
  openButton: {
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  secondaryButton: {
    backgroundColor: COLOR_SECONDARY,
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

export default connect(mapStateToProps, {})(OptionsScreen);

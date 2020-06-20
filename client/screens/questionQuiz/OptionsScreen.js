import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
const OptionsScreen = ({ route, navigation }) => {
  const { questionBankId } = route.params;

  useEffect(() => {
    console.log(questionBankId);
  });

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button
          title="Doing quiz"
          onPress={() =>
            navigation.push("SelectChapter", { questionBankId: questionBankId })
          }
        ></Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Exam test"
          onPress={() =>
            navigation.push("Prepare", { questionBankId: questionBankId })
          }
        ></Button>
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
});

export default connect(mapStateToProps, {})(OptionsScreen);

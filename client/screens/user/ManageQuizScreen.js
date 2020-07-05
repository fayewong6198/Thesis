import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";

import { connect } from "react-redux";
import { loadQuestionBank } from "../../store/actions/questionBank";

import AlertComponent from "../../components/AlertComponent";
import { COLOR_BLUE } from "../../config/color";

const ManageQuizScreen = ({ questionBank, loadQuestionBank, navigation }) => {
  useEffect(() => {
    loadQuestionBank();

    return () => {};
  }, []);
  return (
    <View>
      <AlertComponent></AlertComponent>
      {questionBank.questionBanks.length > 0 ? (
        <FlatList
          data={questionBank.questionBanks}
          renderItem={({ item }) => (
            <View style={styles.items}>
              <TouchableHighlight
                style={styles.openButton}
                onPress={() =>
                  navigation.navigate("ManageChapter", {
                    QuestionBankId: item._id,
                  })
                }
              >
                <Text style={styles.textStyle}>{item.name}</Text>
              </TouchableHighlight>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>No Question Bank found</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  questionBank: state.questionBank,
});

const styles = StyleSheet.create({
  items: {
    margin: 10,
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
});

export default connect(mapStateToProps, { loadQuestionBank })(ManageQuizScreen);

import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";
import { loadQuestionInChapter } from "../../store/actions/questionBank";
import { connect } from "react-redux";

import QuestionBankItem from "../../components/QuestionBankItem";
import AlertComponent from "../../components/AlertComponent";

const QuestionListScreen = ({
  questions,
  loadQuestionInChapter,
  navigation,
  route,
}) => {
  const { questionBankId, id } = route.params;
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log(questionBankId);
      loadQuestionInChapter(questionBankId, id);
      console.log(questions);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <View>
      <AlertComponent></AlertComponent>
      {questions.length > 0 ? (
        <FlatList
          data={questions}
          renderItem={({ item }) => (
            <View style={styles.items}>
              <TouchableNativeFeedback
                onPress={() => {
                  navigation.push("Question", { id: item._id });
                }}
              >
                <Text>{item.text}</Text>
              </TouchableNativeFeedback>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>No Question found</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  questions: state.questionBank.questions,
});

const styles = StyleSheet.create({
  items: {
    margin: 10,
    padding: 10,
    borderRadius: 2,
    color: "#333",
  },
});
export default connect(mapStateToProps, { loadQuestionInChapter })(
  QuestionListScreen
);

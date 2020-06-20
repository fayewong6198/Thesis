import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";
import { loadAllQuestionBanks } from "../../store/actions/questionBank";
import { connect } from "react-redux";

import QuestionBankItem from "../../components/QuestionBankItem";
import AlertComponent from "../../components/AlertComponent";

const ExploreScreen = ({ questionBank, loadAllQuestionBanks, navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      loadAllQuestionBanks();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;


  }, [navigation]);
  return (
    <View>
      <AlertComponent></AlertComponent>
      {questionBank.questionBanks.length > 0 ? (
        <FlatList
          data={questionBank.questionBanks}
          renderItem={({ item }) => (
            <View style={styles.items}>
              <QuestionBankItem
                item={item}
                navigation={navigation}
                button={true}
              ></QuestionBankItem>
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
    padding: 10,
    borderRadius: 2,
    color: "#333",
  },
});
export default connect(mapStateToProps, { loadAllQuestionBanks })(
  ExploreScreen
);

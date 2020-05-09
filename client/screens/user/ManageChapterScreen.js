import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

import { connect } from "react-redux";
import { loadUserChapter } from "../../store/actions/questionBank";

import AlertComponent from "../../components/AlertComponent";

const ManageQuestionScreen = ({ chapters, loadUserChapter, route }) => {
  const { QuestionBankId } = route.params;
  useEffect(() => {
    loadUserChapter(QuestionBankId);
  }, []);
  return (
    <View>
      <AlertComponent></AlertComponent>
      {chapters && chapters.length > 0 ? (
        <FlatList
          data={chapters}
          renderItem={({ item }) => (
            <View style={styles.items}>
              <Button title={item.name}></Button>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>No Chapter found</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  chapters: state.questionBank.chapters,
});

const styles = StyleSheet.create({
  items: {
    margin: 10,
  },
});

export default connect(mapStateToProps, { loadUserChapter })(
  ManageQuestionScreen
);

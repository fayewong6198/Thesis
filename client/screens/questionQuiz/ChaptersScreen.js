import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

import { connect } from "react-redux";
import { loadChapter, generateQuiz } from "../../store/actions/questionBank";

import AlertComponent from "../../components/AlertComponent";

const ChapterScreen = ({ chapters, loadChapter, route }) => {
  const { questionBankId } = route.params;
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
              ahihi
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

export default connect(mapStateToProps, { loadChapter })(ChapterScreen);

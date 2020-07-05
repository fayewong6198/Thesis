import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList,
} from "react-native";

import { connect } from "react-redux";
import { loadUserChapter } from "../../store/actions/questionBank";

import AlertComponent from "../../components/AlertComponent";
import { COLOR_BLUE } from "../../config/color";

const ChapterScreen = ({ chapters, loadUserChapter, route, navigation }) => {
  const { QuestionBankId } = route.params;
  useEffect(() => {
    console.log(QuestionBankId);
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
              <TouchableHighlight
                style={styles.button}
                onPress={() =>
                  navigation.push("QuestionsList", {
                    id: item._id,
                    questionBankId: QuestionBankId,
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
        <Text>No Chapter founds</Text>
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
  button: {
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

export default connect(mapStateToProps, { loadUserChapter })(ChapterScreen);

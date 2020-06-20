import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";

import { connect } from "react-redux";
import { loadChapter } from "../../store/actions/questionBank";

import AlertComponent from "../../components/AlertComponent";
import { COLOR_BLUE } from "../../config/color";

const SelectChapterScreen = ({ chapters, loadChapter, route, navigation }) => {
  const { questionBankId } = route.params;
  useEffect(() => {
    console.log(questionBankId);
    loadChapter(questionBankId);
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
                style={styles.openButton}
                onPress={() =>
                  navigation.push("SelectDifficulty", {
                    questionBankId,
                    chapter: item._id,
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

export default connect(mapStateToProps, { loadChapter })(SelectChapterScreen);

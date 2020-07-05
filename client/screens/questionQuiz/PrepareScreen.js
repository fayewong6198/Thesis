import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableNativeFeedback,
  Button,
  CheckBox,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";
import { loadChapter, generateQuiz } from "../../store/actions/questionBank";
import { TextInput } from "react-native-gesture-handler";
import MultiSelect from "react-native-multiple-select";
import {
  COLOR_SECONDARY,
  COLOR_PRIMARY,
  COLOR_BLUE,
  COLOR_BLUE_DARK,
} from "../../config/color";

const PrepareScreen = ({
  route,
  navigation,
  loadChapter,
  chapters,
  generateQuiz,
}) => {
  const { questionBankId } = route.params;

  const [diff, setDiff] = useState(3);
  const [chapter, setChapter] = useState({});
  const [checked, setChecked] = useState(false);

  const incressingDiff = () => {
    console.log("incressing");
    if (diff < 4.8) setDiff(diff + 0.2);
    console.log(diff);
  };

  const decressingDiff = () => {
    console.log("decressing");
    if (diff > 1.2) setDiff(diff - 0.2);
  };

  const setCheckedHandler = (id) => {
    setChecked(!checked);
    if (chapter[id] == true) {
      chapter[id] = false;
      setChapter(chapter);
    } else {
      chapter[id] = true;
      setChapter(chapter);
    }

    console.log(chapter);
  };

  useEffect(() => {
    console.log(questionBankId);
    loadChapter(questionBankId);
  }, [questionBankId]);

  return (
    <View>
      {chapters && chapters.length > 0 ? (
        <View>
          <FlatList
            data={chapters}
            renderItem={({ item }) => (
              <TouchableNativeFeedback>
                <View style={styles.chapter}>
                  <Text>{item.name}</Text>
                  <CheckBox
                    onChange={() => setCheckedHandler(item._id)}
                    value={chapter[item._id]}
                    id={item._id}
                    name={item._id}
                  ></CheckBox>
                </View>
              </TouchableNativeFeedback>
            )}
            keyExtractor={(item) => item._id}
          />
          <View style={styles.diffContainer}>
            <Text>Diffuculty: </Text>

            <TouchableHighlight
              style={styles.button}
              onPress={() => decressingDiff()}
            >
              <Text style={styles.textStyle}>-</Text>
            </TouchableHighlight>

            <TextInput
              style={styles.difficulty}
              editable={false}
              value={diff.toFixed(2).toString()}
            ></TextInput>

            <TouchableHighlight
              style={styles.button}
              onPress={() => incressingDiff()}
            >
              <Text style={styles.textStyle}>+</Text>
            </TouchableHighlight>
          </View>
        </View>
      ) : (
        <Text>No chapters found</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            generateQuiz(chapter, diff);
            navigation.replace("Quiz", { no: 0, totalTime: 500 });
          }}
        >
          <Text style={styles.textStyle}>Start Quiz</Text>
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
  chapter: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
    flexDirection: "row",
  },

  diffContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  button: {
    backgroundColor: COLOR_BLUE_DARK,
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  difficulty: {
    width: 100,
  },
  openButton: {
    backgroundColor: COLOR_PRIMARY,
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

export default connect(mapStateToProps, { loadChapter, generateQuiz })(
  PrepareScreen
);

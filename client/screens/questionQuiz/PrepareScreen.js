import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableNativeFeedback,
  Button,
  CheckBox,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { loadChapter, generateQuiz } from "../../store/actions/questionBank";
import { TextInput } from "react-native-gesture-handler";
import MultiSelect from "react-native-multiple-select";
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
      <Text>PrepareScreen</Text>
      <Text>{questionBankId}</Text>
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
          <View style={styles.buttonContainer}>
            <Text>Diffuculty: </Text>
            <View style={styles.button}>
              <Button title="-" onPress={() => decressingDiff()}></Button>
            </View>
            <TextInput
              style={styles.difficulty}
              editable={false}
              value={diff.toFixed(2).toString()}
            ></TextInput>
            <View style={styles.button}>
              <Button title="+" onPress={() => incressingDiff()}></Button>
            </View>
          </View>
        </View>
      ) : (
        <Text>No chapters found</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Start Quiz"
          onPress={() => {
            generateQuiz(chapter, diff);
            navigation.replace("Quiz", { no: 0, totalTime: 500 });
          }}
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
  chapter: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
  },

  button: {
    width: 50,
  },
  difficulty: {
    width: 100,
  },
});

export default connect(mapStateToProps, { loadChapter, generateQuiz })(
  PrepareScreen
);

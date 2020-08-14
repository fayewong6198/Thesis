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
import {
  loadChapter,
  generateQuiz,
  generate100Quiz,
} from "../../store/actions/questionBank";
import { MaterialIcons } from "@expo/vector-icons";
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
  generate100Quiz,
}) => {
  const { questionBankId } = route.params;

  const [diff, setDiff] = useState(5);
  const [chapter, setChapter] = useState({});
  const [checked, setChecked] = useState(false);
  const [time, setTime] = useState(500);

  const incressingDiff = () => {
    console.log("incressing");
    if (diff < 9) setDiff(diff + 0.5);
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
            contentContainerStyle={{ marginLeft: 20 }}
            data={chapters}
            renderItem={({ item }) => (
              <TouchableNativeFeedback
                onPress={() => setCheckedHandler(item._id)}
              >
                <View style={styles.chapter}>
                  <CheckBox
                    onChange={() => setCheckedHandler(item._id)}
                    value={chapter[item._id]}
                    id={item._id}
                    name={item._id}
                  ></CheckBox>
                  <Text> {item.name}</Text>
                </View>
              </TouchableNativeFeedback>
            )}
            keyExtractor={(item) => item._id}
          />
          <View style={styles.diffContainer}>
            <View style={{ flex: 1 }}>
              <Text>Diffuculty:</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                padding: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="remove"
                  size={32}
                  color="black"
                  onPress={() => decressingDiff()}
                />
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>
                  {" "}
                  {diff.toFixed(2).toString()}{" "}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="add"
                  size={32}
                  color="black"
                  onPress={() => incressingDiff()}
                />
              </View>
            </View>
          </View>
          <View style={styles.diffContainer}>
            <View style={{ flex: 1 }}>
              <Text>Time:</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                padding: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="remove"
                  size={32}
                  color="black"
                  onPress={() => setTime(time - 50)}
                />
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}> {time}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="add"
                  size={32}
                  color="black"
                  onPress={() => setTime(time + 50)}
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text>No chapters found</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            generateQuiz(chapter, questionBankId, diff, time, false);

            navigation.replace("Quiz", {
              no: 0,
              totalTime: time,
            });
          }}
        >
          <Text style={styles.textStyle}>Start Quiz</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { chapters: state.questionBank.chapters };
};

const styles = StyleSheet.create({
  chapter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
    flexDirection: "row",
  },

  diffContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
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

export default connect(mapStateToProps, {
  loadChapter,
  generateQuiz,
  generate100Quiz,
})(PrepareScreen);

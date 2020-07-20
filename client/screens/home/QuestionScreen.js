import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { login, logout } from "../../store/actions/auth";
import axios from "axios";
import AlertComponent from "../../components/AlertComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR_BLUE, COLOR_SECONDARY } from "../../config/color";

const QuestionScreen = ({ login, auth, navigation, logout, LogoutAction }) => {
  const [formData, setFormData] = useState({
    text: "trandaosimanh@gmail.com",
    answer: "admin",
    rightAnswer: "",
    difficulty: 0,
    time: 0,
  });

  const { text, answer, rightAnswer, difficulty, time } = formData;

  const onChange = (name) => (value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    login(formData);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <AlertComponent></AlertComponent>
        <View style={styles.view}>
          <Text keyboardType="email-address">Text:</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder=""
            value={text}
            name="text"
            onChangeText={(e) => {
              onChange("text")(e);
            }}
          ></TextInput>
        </View>
        <View style={styles.view}>
          <Text>Solution:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your rightAnswer"
            value={rightAnswer}
            onChangeText={onChange("rightAnswer")}
            name="rightAnswer"
            id
          ></TextInput>
        </View>
        <View style={styles.view}>
          <Text>Difficulty:</Text>
          <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <MaterialIcons
                name="remove"
                size={32}
                color="black"
                onPress={() =>
                  setFormData({ ...formData, difficulty: difficulty - 1 })
                }
              />
            </View>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ textAlign: "center" }}>{formData.difficulty}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <MaterialIcons
                name="add"
                size={32}
                color="black"
                onPress={() =>
                  setFormData({ ...formData, difficulty: difficulty + 1 })
                }
              />
            </View>
          </View>
        </View>
        <View style={styles.view}>
          <Text>Time:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={time}
            onChangeText={onChange("time")}
            name="time"
            id
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.primaryButton} onPress={(e) => {}}>
            <Text style={styles.textStyle}>Apply</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.secondaryButton}
            onPress={(e) => {}}
          >
            <Text style={styles.textStyle}>Delete</Text>
          </TouchableHighlight>
        </View>

        {auth.user && <Text>{auth.user.name}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
  input: {
    paddingTop: 3,
    borderBottomWidth: 1,
  },
  container: {
    margin: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  primaryButton: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  secondaryButton: {
    backgroundColor: COLOR_SECONDARY,
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
export default connect(mapStateToProps, { login, logout })(QuestionScreen);

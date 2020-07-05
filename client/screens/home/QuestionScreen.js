import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { login, logout } from "../../store/actions/auth";
import axios from "axios";
import AlertComponent from "../../components/AlertComponent";
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
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <AlertComponent></AlertComponent>
        <View style={styles.input}>
          <Text keyboardType="email-address">Text:</Text>
          <TextInput
            autoCapitalize="none"
            placeholder=""
            value={text}
            name="text"
            onChangeText={(e) => {
              onChange("text")(e);
            }}
          ></TextInput>
        </View>
        <View style={styles.input}>
          <Text>Solution:</Text>
          <TextInput
            placeholder="Enter your rightAnswer"
            value={rightAnswer}
            onChangeText={onChange("rightAnswer")}
            name="rightAnswer"
            id
          ></TextInput>
        </View>
        <View style={styles.input}>
          <Text>Difficulty:</Text>
          <TextInput
            keyboardType="numeric"
            value={difficulty}
            onChangeText={onChange("difficulty")}
            name="difficulty"
            id
          ></TextInput>
        </View>
        <View style={styles.input}>
          <Text>Time:</Text>
          <TextInput
            keyboardType="numeric"
            value={time}
            onChangeText={onChange("time")}
            name="time"
            id
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Apply"></Button>
          <Button title="Delete"></Button>
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
  input: {
    margin: 10,
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
});
export default connect(mapStateToProps, { login, logout })(QuestionScreen);

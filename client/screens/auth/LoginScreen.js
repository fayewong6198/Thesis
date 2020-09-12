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
import { COLOR_BLUE, COLOR_SECONDARY } from "../../config/color";

const LoginScreen = ({ login, auth, navigation, logout, LogoutAction }) => {
  useEffect(() => {
    logout();
  }, []);

  const [formData, setFormData] = useState({
    email: "trandaosimanh@gmail.com",
    password: "admin",
  });

  const { email, password } = formData;

  const onChange = (name) => (value) => {
    console.log(value);
    console.log("asdasdasdasd");
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    console.log("before login");
    login(formData);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <AlertComponent></AlertComponent>
        <View style={styles.input}>
          <Text keyboardType="email-address">Email:</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter your email"
            value={email}
            name="email"
            onChangeText={(e) => {
              onChange("email")(e);
              console.log("asdasd");
            }}
          ></TextInput>
        </View>
        <View style={styles.input}>
          <Text>Password:</Text>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={onChange("password")}
            name="password"
            id
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.openButton}
            onPress={(e) => {
              onSubmit(encodeURIComponent);
            }}
          >
            <Text style={styles.textStyle}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.secondaryButton}
            onPress={() => {
              console.log("navigate");
              navigation.navigate("Register");
            }}
          >
            <Text style={styles.textStyle}>Register</Text>
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
  openButton: {
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
export default connect(mapStateToProps, { login, logout })(LoginScreen);

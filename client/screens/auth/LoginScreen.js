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
          <Text keyboardType="email-address">Email:</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter your email"
            value={email}
            name="email"
            onChangeText={(e) => {
              onChange("email")(e);
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
          <Button
            title="Login"
            onPress={(e) => {
              onSubmit(encodeURIComponent);
            }}
          ></Button>
          <Button
            title="Go to Register"
            onPress={() => navigation.navigate("Register")}
          ></Button>
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
export default connect(mapStateToProps, { login, logout })(LoginScreen);

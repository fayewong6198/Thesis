import React, { useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { register } from "../../store/actions/auth";
import AlertComponent from "../../components/AlertComponent";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "../../config/color";

const RegisterScreen = ({ register, auth, navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const { email, password, name, confirmPassword } = formData;
  const [student, setStudent] = useState(false);
  const [teacher, setTeacher] = useState(false);

  const onChange = (name) => (value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    if (password !== confirmPassword) {
      Alert.alert("Password not match");
    } else {
      register(formData);
    }
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
            onChangeText={(e) => onChange("email")(e)}
          ></TextInput>
        </View>
        <View style={styles.input}>
          <Text>Name:</Text>
          <TextInput
            autoCapitalize="words"
            placeholder="Enter your name"
            value={name}
            name="email"
            onChangeText={(e) => onChange("name")(e)}
          ></TextInput>
        </View>
        <View style={styles.input}>
          <Text>Password:</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={onChange("password")}
          ></TextInput>
        </View>
        <View style={styles.input}>
          <Text>Confirm Password:</Text>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={onChange("confirmPassword")}
          ></TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={[styles.button, { backgroundColor: COLOR_PRIMARY }]}
            onPress={(e) => {
              onSubmit();
            }}
          >
            <Text style={styles.textStyle}>Register</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button, { backgroundColor: COLOR_SECONDARY }]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.textStyle}>Back to login</Text>
          </TouchableHighlight>
        </View>
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
  button: {
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
export default connect(mapStateToProps, { register })(RegisterScreen);

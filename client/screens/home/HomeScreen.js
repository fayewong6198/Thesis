import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableNativeFeedback } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { connect } from "react-redux";
import axios from "axios";
import { loadQuestionBank } from "../../store/actions/questionBank";
import { logout, loadUser } from "../../store/actions/auth";
import AlertComponent from "../../components/AlertComponent";

const HomeScreen = ({
  loadQuestionBank,
  auth,
  navigation,
}) => {
  useEffect(() => {
    console.log("Go to Home");
    if (auth.isAuthenticated) loadQuestionBank();
  }, []);
  let preview = "Home";
  const IP = "http://192.168.0.101";
  const getDocument = async () => {
    const data = await DocumentPicker.getDocumentAsync();
    console.log(data);
    if (data.type === "success") {
      preview = data.name;
      const Data = await FileSystem.readAsStringAsync(data.uri);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await axios.post(
          IP + ":5000/questions/createQuestionBank",
          Data,
          config
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View>
      <AlertComponent></AlertComponent>

      <View>
        <View style={styles.button}>
          <Button
            title="Change Info"
            onPress={() => navigation.push("UserInfo")}
          ></Button>
        </View>
        <View style={styles.button}>
          <Button
            title="Manage Your Quiz"
            onPress={() => navigation.push("ManageQuiz")}
          ></Button>
        </View>
        <View style={styles.button}>
          <Button
            title="Your Course"
            onPress={() => navigation.push("ManageCourse")}
          ></Button>
        </View>
        <View style={styles.button}>
          <Button
            title="Add Question Bank"
            onPress={() => getDocument()}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    questionBank: state.questionBank
  };
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
export default connect(mapStateToProps, { loadQuestionBank, logout, loadUser })(
  HomeScreen
);

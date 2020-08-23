import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  TouchableHighlight,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { connect } from "react-redux";
import axios from "axios";
import { loadQuestionBank } from "../../store/actions/questionBank";
import { logout, loadUser } from "../../store/actions/auth";
import AlertComponent from "../../components/AlertComponent";
import { COLOR_BLUE } from "../../config/color";
import { IP } from "../../config/config";

const HomeScreen = ({ loadQuestionBank, auth, navigation }) => {
  useEffect(() => {
    console.log("Go to Home");
    if (auth.isAuthenticated) loadQuestionBank();
  }, []);
  let preview = "Home";

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
          <TouchableHighlight
            style={styles.openButton}
            onPress={() => navigation.push("UserInfo")}
          >
            <Text style={styles.textStyle}>Change Info</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.button}>
          <TouchableHighlight
            style={styles.openButton}
            onPress={() => navigation.push("ManageQuiz")}
          >
            <Text style={styles.textStyle}>Manage Your Quiz</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.button}>
          <TouchableHighlight
            style={styles.openButton}
            onPress={() => navigation.push("ManageCourse")}
          >
            <Text style={styles.textStyle}>Your Course</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.button}>
          <TouchableHighlight
            style={styles.openButton}
            onPress={() => getDocument()}
          >
            <Text style={styles.textStyle}>Add Question Bank</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    questionBank: state.questionBank,
  };
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    marginHorizontal: 20,
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
export default connect(mapStateToProps, { loadQuestionBank, logout, loadUser })(
  HomeScreen
);

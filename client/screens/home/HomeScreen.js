import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableNativeFeedback
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { connect } from "react-redux";
import axios from "axios";
import { loadQuestionBank } from "../../store/actions/questionBank";
import { logout, loadUser } from "../../store/actions/auth";

const HomeScreen = ({
  loadQuestionBank,
  questionBank,
  auth,
  navigation,
  logout,
  loadUser
}) => {
  useEffect(() => {
    if (auth.isAuthenticated) loadQuestionBank();
  }, [auth]);
  let preview = "Home";
  const IP = "http://192.168.0.103";
  const getDocument = async () => {
    const data = await DocumentPicker.getDocumentAsync();
    console.log(data);
    if (data.type === "success") {
      preview = data.name;
      const Data = await FileSystem.readAsStringAsync(data.uri);
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
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
      <Text>{preview}</Text>
      <Text>{auth.user && auth.user.name}</Text>
      <Text>{questionBank.questionBanks.length}</Text>
      {questionBank.questionBanks.length > 0 ? (
        <FlatList
          data={questionBank.questionBanks}
          renderItem={({ item }) => (
            <TouchableNativeFeedback>
              <Button
                title={item.name}
                onPress={() =>
                  navigation.navigate("Prepare", { questionBankId: item._id })
                }
              ></Button>
            </TouchableNativeFeedback>
          )}
          keyExtractor={item => item._id}
        />
      ) : (
        <Text>No Question Bank found</Text>
      )}
      <View>
        <Button
          title="Log out"
          onPress={() => {
            logout();
            navigation.replace("Login");
          }}
        ></Button>
        <Button title="Choose File" onPress={() => getDocument()}></Button>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    questionBank: state.questionBank
  };
};
export default connect(mapStateToProps, { loadQuestionBank, logout, loadUser })(
  HomeScreen
);

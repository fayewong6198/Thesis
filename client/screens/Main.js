import React, { useEffect, useState } from "react";
import { Provider, connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  TouchableNativeFeedback,
} from "react-native";

// Auth Screen
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
// HomeScreen
import HomeScreen from "./home/HomeScreen";
import ExploreScreen from "./home/ExploreScreen";
import NoteScreen from "./home/NoteScreen";
import NoteDetailScreen from "./home/NoteDetailScreen";
// Quiz Screen
import QuizScreen from "./questionQuiz/QuizScreen";
import LearningScreen from "./questionQuiz/LearningScreen";
import PrepareScreen from "./questionQuiz/PrepareScreen";
import OptionsScreen from "./questionQuiz/OptionsScreen";
import SelectChapterScreen from "./questionQuiz/SelectChapterScreen";
import SelectDifficultyScreen from "./questionQuiz/SelectDifficultyScreen";
import QuestionCommentScreen from "./questionQuiz/QuestionCommentScreen";
// User Screen
import UserInfoScreen from "./user/UserInfoScreen";
import ManageQuizScreen from "./user/ManageQuizScreen";
import ManageCourseScreen from "./user/ManageCourseScreen";
import ManageChapterScreen from "./user/ManageChapterScreen";

// Manage Question Screen
import QuestionListScreen from "./home/QuestionListScreen";
import QuestionScreen from "./home/QuestionScreen";
// Navigator
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="UserInfo" component={UserInfoScreen}></Stack.Screen>
      <Stack.Screen
        name="ManageCourse"
        component={ManageCourseScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="ManageQuiz"
        component={ManageQuizScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="ManageChapter"
        component={ManageChapterScreen}
      ></Stack.Screen>
      <Stack.Screen name="Prepare" component={PrepareScreen}></Stack.Screen>
      <Stack.Screen name="Quiz" component={QuizScreen}></Stack.Screen>
      <Stack.Screen name="Learn" component={LearningScreen}></Stack.Screen>
      <Stack.Screen name="Options" component={OptionsScreen}></Stack.Screen>
      <Stack.Screen
        name="SelectChapter"
        component={SelectChapterScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="SelectDifficulty"
        component={SelectDifficultyScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="NoteDetail"
        component={NoteDetailScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="QuestionComment"
        component={QuestionCommentScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="QuestionsList"
        component={QuestionListScreen}
      ></Stack.Screen>
      <Stack.Screen name="Question" component={QuestionScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

const Explore = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Explore" component={ExploreScreen}></Stack.Screen>
      <Stack.Screen name="Prepare" component={PrepareScreen}></Stack.Screen>
      <Stack.Screen name="Quiz" component={QuizScreen}></Stack.Screen>
      <Stack.Screen name="Options" component={OptionsScreen}></Stack.Screen>
      <Stack.Screen name="Learn" component={LearningScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

const Note = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Note" component={NoteScreen}></Stack.Screen>
      <Stack.Screen
        name="NoteDetail"
        component={NoteDetailScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

const Main = ({ auth }) => {
  return (
    <NavigationContainer>
      {auth && auth.isAuthenticated ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
          <Drawer.Screen name="Explore" component={Explore}></Drawer.Screen>
          <Drawer.Screen name="Note" component={Note}></Drawer.Screen>
          <Drawer.Screen name="Logout" component={Auth}></Drawer.Screen>
        </Drawer.Navigator>
      ) : (
        <Auth></Auth>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(Main);

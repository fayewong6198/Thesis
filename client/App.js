import React, { useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/rootReducer";
// Screen
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/home/HomeScreen";
import PrepareScreen from "./screens/questionQuiz/PrepareScreen";
import QuizScreen from "./screens/questionQuiz/QuizScreen";
// Navigation
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import setAuthToken from "./ultis/setAuthToken";
import { loadUser } from "./store/actions/auth";
const Stack = createStackNavigator();

export default function App() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem("token");
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuthToken(token);
      store.dispatch(loadUser());
    }
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
          <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
          <Stack.Screen name="Prepare" component={PrepareScreen}></Stack.Screen>
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          ></Stack.Screen>
          <Stack.Screen name="Quiz" component={QuizScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

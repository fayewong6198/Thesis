import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  TouchableNativeFeedback
} from "react-native";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/rootReducer";
import Main from "./screens/Main";

import setAuthToken from "./ultis/setAuthToken";
import { loadUser } from "./store/actions/auth";

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

    console.log("State ", store.getState());
  }, [store.getState().auth.isAuthenticated]);

  return (
    <Provider store={store}>
      <Main></Main>
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

import { AsyncStorage } from "react-native";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOAD_USER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_FAILED,
  LOAD_USER_FAILED,
  LOG_OUT
} from "../type";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  test: "asdasdasd"
};

import setAuthToken from "../../ultis/setAuthToken";

const setToken = async payload => {
  const token = payload.data;
  await AsyncStorage.setItem("token", "Bearer " + token);
  setAuthToken("Bearer " + token);
};

const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      setToken(payload);
      console.log("LOGIN SUCCESSFUL");
      return {
        ...state,
        test: "successfull"
      };
    case LOAD_USER_SUCCESS:
      console.log("LOAD_USER_SUCCESS ", payload.data);
      return {
        ...state,
        isAuthenticated: true,
        test: "successfull",
        user: payload.data
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case LOG_OUT:
    case LOAD_USER_FAILED:
      console.log("LOAD USER FAILED");
      removeToken();
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null
      };
    default:
      return state;
  }
}

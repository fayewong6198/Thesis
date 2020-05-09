import {
  LOGIN,
  REGISTER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT
} from "../type";
import axios from "axios";
import setAuthToken from "../../ultis/setAuthToken";
import { AsyncStorage } from "react-native";

const IP = "http://192.168.0.101";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const loadUser = (component = "app") => async dispatch => {
  console.log("GO to LOad user");
  const token = await AsyncStorage.getItem("token");
  if (token) {
    console.log("Try to set auth token");
    setAuthToken(token);
  }
  try {
    const res = await axios.get(IP + ":5000/auth/login");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILED
    });
  }
};

export const login = formData => async dispatch => {
  const body = JSON.stringify(formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(IP + ":5000/auth/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    console.log("Failed");
    dispatch({
      type: LOGIN_FAILED
    });
  }
};

export const register = formData => async dispatch => {
  console.log(formData);

  const body = JSON.stringify(formData);

  const res = await axios.post(
    IP + ":5000/auth/register",
    body,
    config
  );
  console.log(res.data);
  dispatch({
    type: REGISTER,
    payload: "Successfull"
  });
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOG_OUT });
};

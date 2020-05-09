import {
  LOGIN,
  REGISTER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT,
  UPLOAD_AVATAR_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPLOAD_AVATAR_FAILED,
  SET_ALERT,
} from "../type";
import axios from "axios";
import setAuthToken from "../../ultis/setAuthToken";
import { AsyncStorage } from "react-native";

const IP = "http://192.168.0.101";
import { setAlert } from "./alert";
// const IP = "http://192.168.0.103";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const imageConfig = {
  headers: {
    "Content-Type":
      'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
  },
};

export const loadUser = (component = "app") => async (dispatch) => {
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
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILED,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  const body = JSON.stringify(formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(IP + ":5000/auth/login", body, config);
    console.log("Before navigate");

    dispatch(setAlert("Login Success", "success"));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch(setAlert("Login Failed", "danger"));
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.post(
      IP + ":5000/auth/register",
      body,
      config
    );

    dispatch(setAlert("Register Success", "success"));


    console.log(res.data);
    dispatch({
      type: REGISTER,
      payload: "Successfull"
    });
    dispatch({
      type: REGISTER,
      payload: "Successfull",
    });
  } catch (error) {
    dispatch(setAlert("Register Failed", "danger"));
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};

// Update profile
export const updateUser = (formData, imageData) => async (dispatch) => {
  const body = JSON.stringify(formData);

  console.log(body);
  try {
    const res = await axios.put(IP + ":5000/user", body, config);

    dispatch(setAlert("Update Profile Success", "success"));

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Update Profile failed", "danger"));
    dispatch({
      type: UPDATE_USER_FAILED,
    });
  }

  if (imageData) {
    console.log(2);

    console.log(imageData);

    try {
      const res = await axios.put(
        IP + ":5000/user/avatar",
        imageData,
        imageConfig
      );

      dispatch(setAlert("Upload Avatar Success", "success"));
      dispatch({
        type: UPLOAD_AVATAR_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch(setAlert("Upload Avatar Failed", "danger"));

      dispatch({
        type: UPLOAD_AVATAR_FAILED,
      });
    }
  }
};

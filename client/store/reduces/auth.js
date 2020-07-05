import { AsyncStorage } from "react-native";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOAD_USER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_FAILED,
  LOAD_USER_FAILED,
  LOG_OUT,
  UPDATE_USER_SUCCESS,
  UPLOAD_AVATAR_SUCCESS,
  UPDATE_USER_FAILED,
  UPLOAD_AVATAR_FAILED,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILED,
  REMOVE_COURSE_FAILED,
  REMOVE_COURSE_SUCCESS,
} from "../type";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  userCourses: null,
  userChapters: null,
};

import setAuthToken from "../../ultis/setAuthToken";

const setToken = async (payload) => {
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

      return {
        ...state,
      };
    case LOAD_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case UPLOAD_AVATAR_SUCCESS:
    case ADD_COURSE_SUCCESS:
    case REMOVE_COURSE_SUCCESS:
      // console.log("User reducer: " + user);
      return {
        ...state,
        isAuthenticated: true,
        user: payload.data,
      };

    // case ADD_COURSE_SUCCESS:
    //   return {
    //     ...state,
    //     userCourses: payload.data,
    // };

    case ADD_COURSE_FAILED:
      return {
        ...state,
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case LOG_OUT:
    case LOAD_USER_FAILED:
    case REMOVE_COURSE_FAILED:
      console.log("LOAD USER FAILED");
      removeToken();
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null,
      };
    case UPDATE_USER_FAILED:
    case UPLOAD_AVATAR_FAILED:
    default:
      return state;
  }
}

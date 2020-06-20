import {
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILED,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAILED,
  GET_USER_NOTE_SUCCESS,
  GET_USER_NOTE_FAILED,
  UPDATE_USER_NOTE_SUCCESS,
  UPDATE_USER_FAILED,
  CLEAR_NOTE,
  VOTE_SUCCESS,
  VOTE_FAILED,
} from "../type";
import axios from "axios";
import { setAlert } from "./alert";
import { IP } from "../../config/config";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createNote = (key, text) => async (dispatch) => {
  try {
    const body = JSON.stringify(text);
    console.log(body);
    const res = await axios.post(IP + `:5000/notes/${key}`, body, config);

    console.log(res.data);

    dispatch(setAlert("Create note success", "success"));

    dispatch({
      type: ADD_NOTE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Create note failed", "danger"));

    dispatch({
      type: ADD_NOTE_FAILED,
    });
  }
};

export const getNote = (key) => async (dispatch) => {
  try {
    const res = await axios.get(IP + `:5000/notes/${key}`);

    console.log(res.data);

    dispatch(setAlert("Get note success", "success"));
    dispatch({
      type: GET_NOTE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Get note failed", "danger"));
    dispatch({
      type: GET_NOTE_FAILED,
    });
  }
};

export const getUserNote = (key) => async (dispatch) => {
  try {
    const res = await axios.get(IP + `:5000/notes/${key}/user`);

    dispatch(setAlert("Get user note success", "success"));
    dispatch({
      type: GET_USER_NOTE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Get note failed", "danger"));
    dispatch({
      type: GET_USER_NOTE_FAILED,
    });
  }
};

export const updateUserNote = (key, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    console.log("cc 2");
    const res = await axios.put(IP + `:5000/notes/${key}/user`, body, config);

    dispatch(setAlert("Update user note success", "success"));
    dispatch({
      type: UPDATE_USER_NOTE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Update note failed", "danger"));
    dispatch({
      type: UPDATE_USER_FAILED,
    });
  }
};

export const clearNote = () => async (dispatch) => {
  console.log("clear note");
  dispatch(setAlert("Clear note success", "success"));
  dispatch({
    type: CLEAR_NOTE,
  });
};

export const vote = (key, user, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.post(
      IP + `:5000/notes/${key}/${user}/vote`,
      body,
      config
    );

    dispatch(setAlert("Vote success", "success"));

    dispatch({
      type: VOTE_SUCCESS,
    });
  } catch (error) {
    dispatch(setAlert("Vote failed", "failed"));

    dispatch({
      type: VOTE_FAILED,
    });
  }
};

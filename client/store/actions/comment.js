import {
  GET_QUESTION_COMMENT_SUCCESS,
  GET_QUESTION_COMMENT_FAILED,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILED,
} from "../type";
import axios from "axios";
import { setAlert } from "./alert";
import { IP } from "../../config/config";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getQuestionComments = (id) => async (dispatch) => {
  try {
    const res = await axios.get(IP + `:5000/comments/${id}/question`);

    dispatch(setAlert("Get comment success", "success"));

    dispatch({
      type: GET_QUESTION_COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Get comments failed", "danger"));

    dispatch({
      type: GET_QUESTION_COMMENT_FAILED,
    });
  }
};

export const createQuestionComments = (id, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    console.log(body);

    const res = await axios.post(
      IP + `:5000/comments/${id}/question`,
      body,
      config
    );

    dispatch(setAlert("Create comment success", "success"));

    console.log(res.data);

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Create comment failed", "danger"));

    dispatch({
      type: CREATE_COMMENT_FAILED,
    });
  }
};

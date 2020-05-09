import {
  GET_QUESTION_BANK_FAILED,
  GET_QUESTION_BANK_SUCCESS,
  GET_CHAPTER_SUCCESS,
  GET_CHAPTER_FAILED,
  GENERATE_QUIZ_SUCCESS,
  GENERATE_QUIZ_FAILED,
  CLEAR_QUIZ,
} from "../type";
import axios from "axios";

// const IP = "http://192.168.0.103";
const IP = "http://192.168.51.10";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loadQuestionBank = () => async (dispatch) => {
  try {
    const res = await axios.get(IP + ":5000/questions/user");
    dispatch({
      type: GET_QUESTION_BANK_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_QUESTION_BANK_FAILED,
    });
  }
};

export const loadChapter = (questionBankId) => async (dispatch) => {
  try {
    console.log("Go to load chapter");
    const res = await axios.get(
      IP + ":5000/questions/chapters/" + questionBankId
    );

    dispatch({
      type: GET_CHAPTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHAPTER_FAILED,
    });
  }
};

export const loadUserChapter = (questionBankId) => async (dispatch) => {
  try {
    console.log("Go to load chapter");
    const res = await axios.get(
      IP + ":5000/questions/user/chapters/" + questionBankId
    );

    console.log(res.data);

    dispatch({
      type: GET_CHAPTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHAPTER_FAILED,
    });
  }
};

export const generateQuiz = (chapter, diff) => async (dispatch) => {
  try {
    let body = {};
    body.chapters = chapter;
    body.diff = diff;
    body = JSON.stringify(body);
    const res = await axios.post(IP + ":5000/questions/quiz", body, config);

    console.log(res.data);
    dispatch({
      type: GENERATE_QUIZ_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GENERATE_QUIZ_FAILED,
    });
  }
};

export const loadAllQuestionBanks = () => async (dispatch) => {
  try {
    const res = await axios.get(IP + ":5000/questions");
    dispatch({
      type: GET_QUESTION_BANK_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_QUESTION_BANK_FAILED,
    });
  }
};

export const clearQuiz = () => (dispatch) => {
  console.log("Go to clear quiz");
  dispatch({
    type: CLEAR_QUIZ,
  });
};

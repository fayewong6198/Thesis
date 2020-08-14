import {
  GET_QUESTION_BANK_FAILED,
  GET_QUESTION_BANK_SUCCESS,
  GET_CHAPTER_SUCCESS,
  GET_CHAPTER_FAILED,
  GENERATE_QUIZ_SUCCESS,
  GENERATE_QUIZ_FAILED,
  CLEAR_QUIZ,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILED,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAILED,
  GET_USER_CHAPTER_SUCCESS,
  GET_USER_CHAPTER_FAILED,
} from "../type";
import axios from "axios";

import { setAlert } from "./alert";

import { IP } from "../../config/config";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loadQuestionBank = () => async (dispatch) => {
  try {
    const res = await axios.get(IP + ":5000/questions/user");
    dispatch({ type: GET_QUESTION_BANK_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_QUESTION_BANK_FAILED });
  }
};

export const loadChapter = (questionBankId) => async (dispatch) => {
  try {
    console.log("Go to load chapter");
    const res = await axios.get(
      IP + ":5000/questions/chapters/" + questionBankId
    );

    dispatch({ type: GET_CHAPTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_CHAPTER_FAILED });
  }
};

export const loadUserChapter = (questionBankId) => async (dispatch) => {
  try {
    console.log("Go to load chapter");
    const res = await axios.get(
      IP + ":5000/questions/user/chapters/" + questionBankId
    );

    console.log(res.data);

    dispatch({ type: GET_CHAPTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_CHAPTER_FAILED });
  }
};

export const loadQuestionInChapter = (QuestionBankId, id) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      IP + `:5000/questions/${QuestionBankId}/chapter/${id}`
    );

    dispatch({ type: GET_QUESTIONS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_QUESTIONS_FAILED });
  }
};

export const getQuestion = (id) => async (dispatch) => {
  try {
    const res = await axios.get(IP + `:5000/question/${id}/user`);

    dispatch({ type: GET_QUESTION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_QUESTION_FAILED });
  }
};

export const generateQuiz = (
  chapter,
  questionBank,
  diff,
  time = 500,
  quiz = true
) => async (dispatch) => {
  try {
    let body = {};

    console.log("questionBank " + questionBank);
    body.chapters = chapter;
    body.diff = diff;
    body.time = time;
    body.questionBank = questionBank;
    body.quiz = quiz;
    body = JSON.stringify(body);
    const res = await axios.post(IP + ":5000/questions/quiz", body, config);

    dispatch({ type: GENERATE_QUIZ_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GENERATE_QUIZ_FAILED });
  }
};

export const loadAllQuestionBanks = () => async (dispatch) => {
  try {
    const res = await axios.get(IP + ":5000/questions");
    dispatch({ type: GET_QUESTION_BANK_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_QUESTION_BANK_FAILED });
  }
};

export const clearQuiz = () => (dispatch) => {
  console.log("Go to clear quiz");
  dispatch({ type: CLEAR_QUIZ });
};

export const getQuesionWhileDoingQuiz = (id) => async (dispatch) => {
  try {
    const res = await axios.get(IP + `:5000/questions/${id}/quiz`);

    console.log(res.data);

    dispatch(setAlert("Get Question Success", "success"));
    dispatch({ type: GET_QUESTION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch(setAlert("Get Question Error", "danger"));

    dispatch({ type: GET_QUESTION_FAILED });
  }
};

export const submitQuiz = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const res = await axios.post(IP + `:5000/questions/submit`, body, config);

    dispatch(setAlert("Submit success", "success"));

    dispatch({ type: GET_USER_CHAPTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch(setAlert("Submit error", "danger"));
    dispatch({ type: GET_USER_CHAPTER_FAILED, payload: res.data });
    console.log("Error");
  }
};

export const getUserChapter = (questionBankId, chapterId) => async (
  dispatch
) => {
  try {
    let body = {};
    body.questionBank = questionBankId;
    body.chapter = chapterId;
    body = JSON.stringify(body);

    const res = await axios.post(
      IP + `:5000/questions/userChapter`,
      body,
      config
    );

    dispatch({ type: GET_USER_CHAPTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch(setAlert("Get user courses failed", "danger"));

    console.log(error);

    dispatch({ type: GET_USER_CHAPTER_FAILED });
  }
};

export const generate100Quiz = (
  chapter,
  questionBank,
  diff,
  time = 500,
  quiz = true
) => async (dispatch) => {
  console.log("generate 100 quiz");
  try {
    let body = {};

    console.log("questionBank " + questionBank);
    body.chapters = chapter;
    body.diff = diff;
    body.time = time;
    body.questionBank = questionBank;
    body.quiz = quiz;
    body = JSON.stringify(body);
    const res = await axios.post(IP + ":5000/questions/100quiz", body, config);

    dispatch({ type: GENERATE_QUIZ_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GENERATE_QUIZ_FAILED });
  }
};

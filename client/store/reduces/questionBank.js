import { AsyncStorage } from "react-native";
import {
  GET_QUESTION_BANK_FAILED,
  GET_QUESTION_BANK_SUCCESS,
  GET_CHAPTER_SUCCESS,
  GET_CHAPTER_FAILED,
  GENERATE_QUIZ_SUCCESS,
  GENERATE_QUIZ_FAILED,
  CLEAR_QUIZ,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTION_SUCCESS,
  GET_USER_CHAPTER_SUCCESS,
  GET_USER_CHAPTER_FAILED,
} from "../type";

const initialState = {
  loading: false,
  questionBanks: [],
  chapters: [],
  questions: [],
  question: null,
  quiz: [],
  quizTime: false,
  userChapter: null,
};

export default function questionBanks(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_QUESTION_BANK_SUCCESS:
      console.log("GET QUESTION BANK SUCCESS");
      return {
        ...state,
        questionBanks: payload.data,
      };
    case GET_CHAPTER_SUCCESS:
      console.log("Load Chapter Success");
      return {
        ...state,
        chapters: payload.data,
      };
    case GENERATE_QUIZ_SUCCESS:
      return {
        ...state,
        quizTime: true,
        quiz: payload.data,
      };
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: payload.data,
      };
    case GET_QUESTION_SUCCESS:
      return {
        ...state,
        question: payload.data,
      };
    case GET_QUESTION_BANK_FAILED:
      return {
        ...state,
        loading: true,
        question: [],
      };
    case GET_USER_CHAPTER_SUCCESS:
      console.log(" USERchAPTER " + payload.data);
      console.log(" USERchAPTER " + payload);
      return {
        ...state,
        loading: false,

        userChapter: payload.data,
      };
    case GET_USER_CHAPTER_FAILED:
      return {
        ...state,
        userChapter: null,
      };
    case CLEAR_QUIZ:
    case GENERATE_QUIZ_FAILED:
      return {
        ...state,
        quizTime: false,
        quiz: [],
      };
    case GET_CHAPTER_FAILED:
    case GET_QUESTION_BANK_FAILED:
      console.log("Load Chapter or Bank failed");
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}

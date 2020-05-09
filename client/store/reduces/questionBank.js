import { AsyncStorage } from "react-native";
import {
  GET_QUESTION_BANK_FAILED,
  GET_QUESTION_BANK_SUCCESS,
  GET_CHAPTER_SUCCESS,
  GET_CHAPTER_FAILED,
  GENERATE_QUIZ_SUCCESS,
  GENERATE_QUIZ_FAILED,
  CLEAR_QUIZ,
} from "../type";

const initialState = {
  loading: false,
  questionBanks: [],
  chapters: [],
  quiz: [],
  quizTime: false,
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

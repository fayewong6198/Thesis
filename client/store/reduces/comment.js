import { AsyncStorage } from "react-native";
import {
  GET_QUESTION_COMMENT_SUCCESS,
  GET_QUESTION_COMMENT_FAILED,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILED,
} from "../type";

const initialState = {
  loading: false,
  comments: [],
  comment: null,
};

export default function questionComment(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_QUESTION_COMMENT_SUCCESS:
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: payload.data,
      };

    case GET_QUESTION_COMMENT_FAILED:
      return {
        ...state,
        notes: [],
        loading: true,
      };
    case CREATE_COMMENT_FAILED:
    default:
      return state;
  }
}

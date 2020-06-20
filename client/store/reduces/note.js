import { AsyncStorage } from "react-native";
import {
  GET_NOTE_SUCCESS,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILED,
  GET_USER_NOTE_FAILED,
  GET_USER_NOTE_SUCCESS,
  UPDATE_USER_NOTE_SUCCESS,
  UPDATE_USER_NOTE_FAILED,
  CLEAR_NOTE,
} from "../type";

const initialState = {
  loading: false,
  notes: ["Note is not available"],
  note: null,
};

export default function questionBanks(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTE_SUCCESS:
    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        notes: payload.data,
      };
    case ADD_NOTE_FAILED:
      return {
        ...state,
        notes: ["Note is not available"],
      };
    case UPDATE_USER_NOTE_SUCCESS:
    case GET_USER_NOTE_SUCCESS:
      return {
        ...state,
        note: payload.data,
      };
    case UPDATE_USER_NOTE_FAILED:
    case GET_USER_NOTE_FAILED:
      return {
        ...state,
        note: null,
      };
    case CLEAR_NOTE:
      return {
        ...state,
        note: null,
        notes: ["Note is not available"],
      };
    default:
      return state;
  }
}

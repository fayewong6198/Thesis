import { combineReducers } from "redux";
import auth from "./reduces/auth";
import questionBank from "./reduces/questionBank";
import alert from "./reduces/alert";
import note from "./reduces/note";
import comment from "./reduces/comment";

const rootReducer = combineReducers({
  auth,
  questionBank,
  alert,
  note,
  comment,
});

export default rootReducer;

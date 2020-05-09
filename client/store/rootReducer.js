import { combineReducers } from "redux";
import auth from "./reduces/auth";
import questionBank from "./reduces/questionBank";
import alert from "./reduces/alert";

const rootReducer = combineReducers({
  auth,
  questionBank,
  alert,
});

export default rootReducer;

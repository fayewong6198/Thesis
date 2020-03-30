import { combineReducers } from "redux";
import auth from "./reduces/auth";
import questionBank from "./reduces/questionBank";

const rootReducer = combineReducers({
  auth,
  questionBank
});

export default rootReducer;

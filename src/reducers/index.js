import { combineReducers } from "redux";
import flashcardReducer from "./flashcardReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  flashcard: flashcardReducer,
  error: errorReducer
});

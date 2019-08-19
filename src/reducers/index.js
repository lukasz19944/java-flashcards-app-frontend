import { combineReducers } from "redux";
import flashcardReducer from "./flashcardReducer";

export default combineReducers({
  flashcard: flashcardReducer
});

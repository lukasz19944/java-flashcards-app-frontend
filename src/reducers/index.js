import { combineReducers } from "redux";
import flashcardReducer from "./flashcardReducer";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import ticketReducer from "./ticketReducer";

export default combineReducers({
  flashcard: flashcardReducer,
  error: errorReducer,
  security: securityReducer,
  ticket: ticketReducer
});

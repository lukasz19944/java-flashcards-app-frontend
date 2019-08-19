import axios from "axios";
import { GET_FLASHCARDS } from "./types";

export const getFlashcards = () => async dispatch => {
  const res = await axios.get("http://localhost:8090/api/flashcard");
  dispatch({
    type: GET_FLASHCARDS,
    payload: res.data
  });
};

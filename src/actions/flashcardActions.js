import axios from "axios";
import {
  GET_FLASHCARDS,
  GET_FLASHCARDS_BY_CATEGORY,
  GET_CATEGORIES
} from "./types";

export const getFlashcards = () => async dispatch => {
  const res = await axios.get("http://localhost:8090/api/flashcard");
  dispatch({
    type: GET_FLASHCARDS,
    payload: res.data
  });
};

export const getFlashcardsByCategory = category => async dispatch => {
  const res = await axios.get(
    `http://localhost:8090/api/flashcard/category/${category}`
  );
  dispatch({
    type: GET_FLASHCARDS_BY_CATEGORY,
    payload: res.data
  });
};

export const getCategories = () => async dispatch => {
  const res = await axios.get("http://localhost:8090/api/flashcard/category");
  dispatch({
    type: GET_CATEGORIES,
    payload: res.data
  });
};

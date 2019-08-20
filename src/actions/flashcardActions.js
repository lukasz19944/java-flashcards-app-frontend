import axios from "axios";
import {
  GET_FLASHCARDS,
  GET_FLASHCARDS_BY_CATEGORY,
  GET_CATEGORIES,
  GET_COUNT_ALL_FLASHCARDS,
  GET_COUNT_ALL_FLASHCARDS_BY_KNOWLEDGE
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

export const createFlashcard = (flashcard, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8090/api/flashcard", flashcard);
  } catch (error) {
    console.log("CreateFlashcard error");
  }
};

export const countAllFlashcards = () => async dispatch => {
  const res = await axios.get("http://localhost:8090/api/flashcard/count/");
  dispatch({
    type: GET_COUNT_ALL_FLASHCARDS,
    payload: res.data
  });
};

export const countAllFlashcardsByKnowledge = () => async dispatch => {
  const res = await axios.get(
    "http://localhost:8090/api/flashcard/count/level"
  );
  dispatch({
    type: GET_COUNT_ALL_FLASHCARDS_BY_KNOWLEDGE,
    payload: res.data
  });
};

import axios from "axios";
import {
  GET_FLASHCARDS,
  GET_FLASHCARDS_BY_CATEGORY,
  GET_FLASHCARDS_BY_CATEGORY_AND_DIFFICULTY,
  GET_CATEGORIES,
  GET_COUNT_ALL_FLASHCARDS,
  GET_COUNT_ALL_FLASHCARDS_BY_KNOWLEDGE,
  GET_COUNT_ALL_FLASHCARDS_BY_CATEGORY,
  GET_COUNT_ALL_FLASHCARDS_BY_CATEGORY_AND_KNOWLEDGE,
  DELETE_FLASHCARD,
  GET_FLASHCARD,
  GET_ERRORS,
  GET_RANDOM_FLASHCARDS
} from "./types";
import { shuffleFlashcards } from "../utils/arrayUtils";

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
    payload: shuffleFlashcards(res.data)
  });
};

export const getFlashcardsByCategoryAndDifficulty = (
  category,
  difficulty
) => async dispatch => {
  const res = await axios.get(
    `http://localhost:8090/api/flashcard/category/${category}/${difficulty}`
  );
  dispatch({
    type: GET_FLASHCARDS_BY_CATEGORY_AND_DIFFICULTY,
    payload: shuffleFlashcards(res.data)
  });
};

export const getCategories = () => async dispatch => {
  const res = await axios.get("http://localhost:8090/api/flashcard/category");
  dispatch({
    type: GET_CATEGORIES,
    payload: res.data
  });
};

export const createFlashcard = (
  flashcard,
  history,
  method
) => async dispatch => {
  try {
    await axios.post("http://localhost:8090/api/flashcard", flashcard);

    if (history) {
      if (method === "create") {
        history.push("/");
      } else if (method === "update") {
        history.push("/flashcards");
      }
    }

    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
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

export const countAllFlashcardsByCategory = () => async dispatch => {
  const res = await axios.get(
    "http://localhost:8090/api/flashcard/count/category/"
  );
  dispatch({
    type: GET_COUNT_ALL_FLASHCARDS_BY_CATEGORY,
    payload: res.data
  });
};

export const countAllFlashcardsByCategoryAndKnowledge = () => async dispatch => {
  const res = await axios.get(
    "http://localhost:8090/api/flashcard/count/category-level/"
  );
  dispatch({
    type: GET_COUNT_ALL_FLASHCARDS_BY_CATEGORY_AND_KNOWLEDGE,
    payload: res.data
  });
};

export const resetProgress = () => async dispatch => {
  if (window.confirm("Czy na pewno zresetować postęp?")) {
    await axios.get("http://localhost:8090/api/flashcard/reset/");

    window.location.reload();
  }
};

export const deleteFlashcard = id => async dispatch => {
  if (window.confirm("Czy na pewno usunąć to pytanie?")) {
    await axios.delete(`http://localhost:8090/api/flashcard/${id}`);
    dispatch({
      type: DELETE_FLASHCARD,
      payload: id
    });
  }
};

export const getFlashcard = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8090/api/flashcard/${id}`);
    dispatch({
      type: GET_FLASHCARD,
      payload: res.data
    });
  } catch (error) {
    history.push("/");
  }
};

export const getRandomFlashcards = () => async dispatch => {
  const res = await axios.get("http://localhost:8090/api/flashcard/random/");
  dispatch({
    type: GET_RANDOM_FLASHCARDS,
    payload: res.data
  });
};

export const updateKnowledgeLevel = (flashcard, history) => async dispatch => {
  try {
    await axios.post(
      "http://localhost:8090/api/flashcard/updateKnowledge",
      flashcard
    );
    history.push("/");
  } catch (err) {
    console.log("Update knowledge error");
  }
};

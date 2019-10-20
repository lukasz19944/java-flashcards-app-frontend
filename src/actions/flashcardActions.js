import axios from "axios";
import {
  GET_ACCEPTED_FLASHCARDS,
  GET_NOT_ACCEPTED_FLASHCARDS,
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
  GET_RANDOM_FLASHCARDS,
  ACCEPT_FLASHCARD,
  REJECT_FLASHCARD
} from "./types";
import { shuffleFlashcards } from "../utils/arrayUtils";

export const getAcceptedFlashcards = () => async dispatch => {
  const res = await axios.get("http://localhost:8090/api/flashcard/accepted");
  dispatch({
    type: GET_ACCEPTED_FLASHCARDS,
    payload: res.data
  });
};

export const getNotAcceptedFlashcards = () => async dispatch => {
  const res = await axios.get(
    "http://localhost:8090/api/flashcard/notAccepted"
  );
  dispatch({
    type: GET_NOT_ACCEPTED_FLASHCARDS,
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

export const getCategoriesByDifficulty = difficulty => async dispatch => {
  const res = await axios.get(
    `http://localhost:8090/api/flashcard/category/difficulty/${difficulty}`
  );
  dispatch({
    type: GET_CATEGORIES,
    payload: res.data
  });
};

export const createFlashcard = (
  flashcard,
  history,
  method,
  proposed,
  fromUrl
) => async dispatch => {
  try {
    if (proposed) {
      await axios.post(
        "http://localhost:8090/api/flashcard/propose",
        flashcard
      );
    } else {
      await axios.post("http://localhost:8090/api/flashcard", flashcard);
    }

    if (history) {
      if (method === "create") {
        history.push("/");
      } else if (method === "update") {
        history.push(fromUrl);
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

export const updateKnowledgeLevel = flashcard => async dispatch => {
  try {
    await axios.post(
      "http://localhost:8090/api/flashcard/updateKnowledge",
      flashcard
    );
  } catch (err) {
    console.log(err);
  }
};

export const acceptFlashcard = id => async dispatch => {
  if (window.confirm("Czy na pewno chcesz zaakceptować to pytanie?")) {
    await axios.get(`http://localhost:8090/api/flashcard/accept/${id}`);
    dispatch({
      type: ACCEPT_FLASHCARD,
      payload: id
    });
    window.location.reload();
  }
};

export const rejectFlashcard = id => async dispatch => {
  if (window.confirm("Czy na pewno chcesz odrzucić to pytanie?")) {
    await axios.get(`http://localhost:8090/api/flashcard/reject/${id}`);
    dispatch({
      type: REJECT_FLASHCARD,
      payload: id
    });
    window.location.reload();
  }
};

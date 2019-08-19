import {
  GET_FLASHCARDS,
  GET_FLASHCARDS_BY_CATEGORY,
  GET_CATEGORIES
} from "../actions/types";

const initialState = {
  flashcards: [],
  flashcardsByCategory: [],
  categories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FLASHCARDS:
      return {
        ...state,
        flashcards: action.payload
      };

    case GET_FLASHCARDS_BY_CATEGORY:
      return {
        ...state,
        flashcardsByCategory: action.payload
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };

    default:
      return state;
  }
}

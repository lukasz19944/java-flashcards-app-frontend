import {
  GET_FLASHCARDS,
  GET_FLASHCARDS_BY_CATEGORY,
  GET_CATEGORIES,
  GET_COUNT_ALL_FLASHCARDS,
  GET_COUNT_ALL_FLASHCARDS_BY_KNOWLEDGE,
  GET_COUNT_ALL_FLASHCARDS_BY_CATEGORY,
  GET_COUNT_ALL_FLASHCARDS_BY_CATEGORY_AND_KNOWLEDGE,
  DELETE_FLASHCARD
} from "../actions/types";

const initialState = {
  flashcards: [],
  flashcardsByCategory: [],
  categories: [],
  countAllFlashcards: 0,
  countAllFlashcardsByKnowledge: 0,
  countAllFlashcardsByCategory: {},
  countAllFlashcardsByCategoryAndKnowledge: {}
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

    case GET_COUNT_ALL_FLASHCARDS:
      return {
        ...state,
        countAllFlashcards: action.payload
      };

    case GET_COUNT_ALL_FLASHCARDS_BY_KNOWLEDGE:
      return {
        ...state,
        countAllFlashcardsByKnowledge: action.payload
      };

    case GET_COUNT_ALL_FLASHCARDS_BY_CATEGORY:
      return {
        ...state,
        countAllFlashcardsByCategory: action.payload
      };

    case GET_COUNT_ALL_FLASHCARDS_BY_CATEGORY_AND_KNOWLEDGE:
      return {
        ...state,
        countAllFlashcardsByCategoryAndKnowledge: action.payload
      };

    case DELETE_FLASHCARD:
      return {
        ...state,
        flashcards: state.flashcards.filter(
          flashcard => flashcard.id !== action.payload
        )
      };

    default:
      return state;
  }
}

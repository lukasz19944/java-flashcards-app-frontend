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
  GET_RANDOM_FLASHCARDS
} from "../actions/types";

const initialState = {
  acceptedFlashcards: [],
  notAcceptedFlashcards: [],
  flashcardsByCategory: [],
  flashcardsByCategoryAndDifficulty: [],
  categories: [],
  countAllFlashcards: 0,
  countAllFlashcardsByKnowledge: 0,
  countAllFlashcardsByCategory: {},
  countAllFlashcardsByCategoryAndKnowledge: {},
  flashcard: {},
  randomFlashcards: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACCEPTED_FLASHCARDS:
      return {
        ...state,
        acceptedFlashcards: action.payload
      };

    case GET_NOT_ACCEPTED_FLASHCARDS:
      return {
        ...state,
        notAcceptedFlashcards: action.payload
      };

    case GET_FLASHCARDS_BY_CATEGORY:
      return {
        ...state,
        flashcardsByCategory: action.payload
      };

    case GET_FLASHCARDS_BY_CATEGORY_AND_DIFFICULTY:
      return {
        ...state,
        flashcardsByCategoryAndDifficulty: action.payload
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

    case GET_FLASHCARD:
      return {
        ...state,
        flashcard: action.payload
      };

    case GET_RANDOM_FLASHCARDS:
      return {
        ...state,
        randomFlashcards: action.payload
      };

    default:
      return state;
  }
}

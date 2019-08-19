import { GET_FLASHCARDS } from "../actions/types";

const initialState = {
  flashcards: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FLASHCARDS:
      return {
        ...state,
        flashcards: action.payload
      };

    default:
      return state;
  }
}

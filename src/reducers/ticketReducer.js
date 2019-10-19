import { GET_ALL_TICKETS, DELETE_TICKET, GET_TICKET } from ".././actions/types";

const initialState = {
  tickets: [],
  ticket: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TICKETS:
      return {
        ...state,
        tickets: action.payload
      };

    case GET_TICKET:
      return {
        ...state,
        ticket: action.payload
      };

    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket.id !== action.payload)
      };

    default:
      return state;
  }
}

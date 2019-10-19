import axios from "axios";
import {
  GET_ERRORS,
  GET_ALL_TICKETS,
  DELETE_TICKET,
  GET_TICKET,
  GET_FLASHCARD
} from "./types";

export const createTicket = ticket => async dispatch => {
  try {
    await axios.post("http://localhost:8090/api/ticket", ticket);

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

export const getAllTickets = () => async dispatch => {
  const res = await axios.get("http://localhost:8090/api/ticket");
  dispatch({
    type: GET_ALL_TICKETS,
    payload: res.data
  });
};

export const getTicket = id => async dispatch => {
  const res = await axios.get(`http://localhost:8090/api/ticket/${id}`);
  dispatch({
    type: GET_TICKET,
    payload: res.data
  });
  dispatch({
    type: GET_FLASHCARD,
    payload: res.data.flashcard
  });
};

export const deleteTicket = (id, history) => async dispatch => {
  if (
    window.confirm("Zgłoszenie zostanie usunięte z listy. Czy potwierdzasz?")
  ) {
    await axios.delete(`http://localhost:8090/api/ticket/${id}`);
    dispatch({
      type: DELETE_TICKET,
      payload: id
    });

    history.push("/tickets");
  }
};

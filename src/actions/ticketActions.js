import axios from "axios";
import { GET_ERRORS } from "./types";

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

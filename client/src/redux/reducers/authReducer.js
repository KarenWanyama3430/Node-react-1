import { FETCH_USER, LOADING_START, LOADING_STOP } from "../actions/types";

const INITIAL_STATE = {
  loggedIn: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, loggedIn: action.payload };
    case LOADING_START:
      return { ...state, loading: true };
    case LOADING_STOP:
      return { ...state, loading: false };
    default:
      return state;
  }
};

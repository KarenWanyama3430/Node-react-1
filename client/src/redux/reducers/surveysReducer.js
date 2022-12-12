import { FETCH_SURVEYS } from "../actions/types";

const INITIAL_STATE = {
  surveys: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return { ...state, surveys: action.payload };
    default:
      return state;
  }
};

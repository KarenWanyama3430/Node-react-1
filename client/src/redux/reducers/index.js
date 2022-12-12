import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys: surveysReducer
});

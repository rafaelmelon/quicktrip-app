import { combineReducers } from "redux-immutable";

import { geoReducer } from "./geo";

export const rootReducer = combineReducers({
  geo: geoReducer
});

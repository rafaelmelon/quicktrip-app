import {
  GEO_SET_INITIAL_POSITION,
  GEO_SET_INITIAL_POSITION_ERROR,
  GEO_SET_CURRENT_POSITION,
  STATE_GEO_INITIAL_POSITION_ERROR
} from "./constant";
import { initialState } from "./initial";
import { setInitialPosition, setCurrentPosition } from "./utils";
import { createReducer } from "redux/utils";

const reducer = createReducer(initialState, {
  [GEO_SET_INITIAL_POSITION]: (state, action) =>
    setInitialPosition(state, action.payload),
  [GEO_SET_INITIAL_POSITION_ERROR]: (state, action) =>
    state.set(STATE_GEO_INITIAL_POSITION_ERROR, action.payload),
  [GEO_SET_CURRENT_POSITION]: (state, action) =>
    setCurrentPosition(state, action.payload)
});

export { reducer as geoReducer };

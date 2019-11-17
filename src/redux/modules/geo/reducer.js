import {
  GEO_SET_INITIAL_POSITION,
  GEO_SET_INITIAL_POSITION_ERROR,
  GEO_SET_CURRENT_POSITION,
  GEO_SET_AUTOCOMPLETE_RESPONSE,
  GEO_SET_AUTOCOMPLETE_FETCHING,
  GEO_SET_AUTOCOMPLETE_ERROR,
  STATE_GEO_RESPONSE,
  STATE_GEO_FETCHING,
  STATE_GEO_ERROR,
  STATE_GEO_INITIAL_POSITION,
  STATE_GEO_AUTOCOMPLETE
} from "./constant";
import { initialState } from "./initial";
import { setInitialPosition, setCurrentPosition } from "./utils";
import { createReducer } from "redux/utils";

const reducer = createReducer(initialState, {
  [GEO_SET_INITIAL_POSITION]: (state, action) =>
    setInitialPosition(state, action.payload),
  [GEO_SET_INITIAL_POSITION_ERROR]: (state, action) =>
    state.setIn([STATE_GEO_INITIAL_POSITION, STATE_GEO_ERROR], action.payload),
  [GEO_SET_CURRENT_POSITION]: (state, action) =>
    setCurrentPosition(state, action.payload),
  [GEO_SET_AUTOCOMPLETE_RESPONSE]: (state, action) =>
    state.setIn([STATE_GEO_AUTOCOMPLETE, STATE_GEO_RESPONSE], action.payload),
  [GEO_SET_AUTOCOMPLETE_FETCHING]: (state, action) =>
    state.setIn([STATE_GEO_AUTOCOMPLETE, STATE_GEO_FETCHING], action.payload),
  [GEO_SET_AUTOCOMPLETE_ERROR]: (state, action) =>
    state.setIn([STATE_GEO_AUTOCOMPLETE, STATE_GEO_ERROR], action.payload)
});

export { reducer as geoReducer };

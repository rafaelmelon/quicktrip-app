import { fromJS, List } from "immutable";

import {
  GEO_SET_CURRENT_POSITION,
  GEO_SET_CURRENT_POSITION_ERROR,
  GEO_SET_AUTOCOMPLETE_RESPONSE,
  GEO_SET_AUTOCOMPLETE_FETCHING,
  GEO_SET_AUTOCOMPLETE_ERROR,
  GEO_RESET_AUTOCOMPLETE,
  GEO_SET_PLACES_RESPONSE,
  GEO_SET_PLACES_FETCHING,
  GEO_SET_PLACES_ERROR,
  GEO_SET_PLACE,
  STATE_GEO_RESPONSE,
  STATE_GEO_FETCHING,
  STATE_GEO_ERROR,
  STATE_GEO_CURRENT_POSITION,
  STATE_GEO_AUTOCOMPLETE,
  STATE_GEO_PLACE,
  STATE_GEO_PLACES
} from "./constant";
import { initialState } from "./initial";
import { setCurrentPosition } from "./utils";
import { createReducer } from "redux/utils";

const reducer = createReducer(initialState, {
  [GEO_SET_CURRENT_POSITION]: (state, action) =>
    setCurrentPosition(state, action.payload),

  [GEO_SET_CURRENT_POSITION_ERROR]: state =>
    state.setIn([STATE_GEO_CURRENT_POSITION, STATE_GEO_ERROR], {}),

  [GEO_SET_AUTOCOMPLETE_RESPONSE]: (state, action) => {
    const { predictions } = action.payload;
    return state
      .setIn([STATE_GEO_AUTOCOMPLETE, STATE_GEO_RESPONSE], fromJS(predictions))
      .setIn([STATE_GEO_AUTOCOMPLETE, STATE_GEO_FETCHING], false);
  },

  [GEO_SET_AUTOCOMPLETE_FETCHING]: state =>
    state.setIn([STATE_GEO_AUTOCOMPLETE, STATE_GEO_FETCHING], true),
  [GEO_SET_AUTOCOMPLETE_ERROR]: (state, action) =>
    state.setIn([STATE_GEO_AUTOCOMPLETE, STATE_GEO_ERROR], action.payload),
  [GEO_RESET_AUTOCOMPLETE]: state =>
    state.setIn([STATE_GEO_AUTOCOMPLETE, STATE_GEO_RESPONSE], List()),

  [GEO_SET_PLACES_ERROR]: state =>
    state.setIn([STATE_GEO_PLACES, STATE_GEO_ERROR], {}),
  [GEO_SET_PLACES_RESPONSE]: (state, action) =>
    state
      .setIn([STATE_GEO_PLACES, STATE_GEO_RESPONSE], fromJS(action.payload))
      .setIn([STATE_GEO_PLACES, STATE_GEO_FETCHING], false),
  [GEO_SET_PLACES_FETCHING]: state =>
    state.setIn([STATE_GEO_PLACES, STATE_GEO_FETCHING], true),

  [GEO_SET_PLACE]: (state, action) => state.set(STATE_GEO_PLACE, action.payload)
});

export { reducer as geoReducer };

import {
  STATE_GEO,
  STATE_GEO_RESPONSE,
  STATE_GEO_FETCHING,
  STATE_GEO_ERROR,
  STATE_GEO_INITIAL_POSITION,
  STATE_GEO_CURRENT_POSITION,
  STATE_GEO_AUTOCOMPLETE,
  STATE_GEO_PLACE
} from "./constant";
import { selectorState } from "redux/utils";

export const selectorGeo = state => selectorState(state, STATE_GEO);

export const selectorInitialPosition = state =>
  selectorState(selectorGeo(state), STATE_GEO_INITIAL_POSITION);
export const selectorInitialPositionError = state =>
  selectorState(selectorInitialPosition(state), STATE_GEO_ERROR);

export const selectorCurrentPosition = state =>
  selectorState(selectorGeo(state), STATE_GEO_CURRENT_POSITION);

export const selectorAutocomplete = state =>
  selectorState(selectorGeo(state), STATE_GEO_AUTOCOMPLETE);
export const selectorAutocompleteResponse = state =>
  selectorState(selectorAutocomplete(state), STATE_GEO_RESPONSE);
export const selectorAutocompleteFetching = state =>
  selectorState(selectorAutocomplete(state), STATE_GEO_FETCHING);
export const selectorAutocompleteError = state =>
  selectorState(selectorAutocomplete(state), STATE_GEO_ERROR);

export const selectorPlace = state =>
  selectorState(selectorGeo(state), STATE_GEO_PLACE);

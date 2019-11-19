import {
  STATE_GEO,
  STATE_GEO_RESPONSE,
  STATE_GEO_FETCHING,
  STATE_GEO_ERROR,
  STATE_GEO_CURRENT_POSITION,
  STATE_GEO_AUTOCOMPLETE,
  STATE_GEO_PLACE,
  STATE_GEO_PLACES
} from "./constant";
import { selectorState } from "redux/utils";

export const selectorGeo = state => selectorState(state, STATE_GEO);

export const selectorCurrentPosition = state =>
  selectorState(selectorGeo(state), STATE_GEO_CURRENT_POSITION);
export const selectorCurrentPositionError = state =>
  selectorState(selectorCurrentPosition(state), STATE_GEO_ERROR);

export const selectorAutocomplete = state =>
  selectorState(selectorGeo(state), STATE_GEO_AUTOCOMPLETE);
export const selectorAutocompleteResponse = state =>
  selectorState(selectorAutocomplete(state), STATE_GEO_RESPONSE);
export const selectorAutocompleteFetching = state =>
  selectorState(selectorAutocomplete(state), STATE_GEO_FETCHING);
export const selectorAutocompleteError = state =>
  selectorState(selectorAutocomplete(state), STATE_GEO_ERROR);

export const selectorPlaces = state =>
  selectorState(selectorGeo(state), STATE_GEO_PLACES);
export const selectorPlacesResponse = state =>
  selectorState(selectorPlaces(state), STATE_GEO_RESPONSE);
export const selectorPlacesFetching = state =>
  selectorState(selectorPlaces(state), STATE_GEO_FETCHING);
export const selectorPlacesError = state =>
  selectorState(selectorPlaces(state), STATE_GEO_ERROR);

export const selectorPlace = state =>
  selectorState(selectorGeo(state), STATE_GEO_PLACE);

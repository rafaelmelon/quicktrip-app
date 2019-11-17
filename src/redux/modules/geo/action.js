import {
  GEO_SET_INITIAL_POSITION,
  GEO_SET_INITIAL_POSITION_ERROR,
  GEO_SET_CURRENT_POSITION,
  GEO_SET_AUTOCOMPLETE_RESPONSE,
  GEO_SET_AUTOCOMPLETE_FETCHING,
  GEO_SET_AUTOCOMPLETE_ERROR,
  GEO_SET_PLACE
} from "./constant";

import { request, requestJSON } from "utils/fetch";

export const setInitialPosition = payload => ({
  type: GEO_SET_INITIAL_POSITION,
  payload
});

export const setInitialPositionError = payload => ({
  type: GEO_SET_INITIAL_POSITION_ERROR,
  payload
});

export const setCurrentPosition = payload => ({
  type: GEO_SET_CURRENT_POSITION,
  payload
});

export const fetchAutocompleteRequest = () => ({
  type: GEO_SET_AUTOCOMPLETE_FETCHING
});

export const fetchAutocompleteResponse = payload => ({
  type: GEO_SET_AUTOCOMPLETE_RESPONSE,
  payload
});

export const fetchAutocompleteError = error => ({
  type: GEO_SET_AUTOCOMPLETE_ERROR,
  error
});

export const fetchAutocomplete = payload => dispatch => {
  dispatch(fetchAutocompleteRequest());
  request(`places/${payload}`)
    .then(json => dispatch(fetchAutocompleteResponse(json)))
    .catch(error => dispatch(fetchAutocompleteError(error)));
};

export const setPlace = payload => ({
  type: GEO_SET_PLACE,
  payload
});

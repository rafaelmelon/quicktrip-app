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
  GEO_SET_PLACE
} from "./constant";

import { request } from "utils/fetch";

export const setCurrentPosition = payload => ({
  type: GEO_SET_CURRENT_POSITION,
  payload
});

export const setCurrentPositionError = payload => ({
  type: GEO_SET_CURRENT_POSITION_ERROR,
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

export const resetAutocomplete = payload => ({
  type: GEO_RESET_AUTOCOMPLETE,
  payload
});

export const fetchAutocomplete = payload => dispatch => {
  dispatch(fetchAutocompleteRequest());
  const options = {
    method: "GET"
  };
  request(`places/autocomplete/${payload}`, options)
    .then(json => dispatch(fetchAutocompleteResponse(json)))
    .catch(error => dispatch(fetchAutocompleteError(error)));
};

export const fetchPlacesRequest = () => ({
  type: GEO_SET_PLACES_FETCHING
});

export const fetchPlacesResponse = payload => ({
  type: GEO_SET_PLACES_RESPONSE,
  payload
});

export const fetchPlacesError = error => ({
  type: GEO_SET_PLACES_ERROR,
  error
});

export const fetchPlaces = payload => dispatch => {
  dispatch(fetchPlacesRequest());
  const options = {
    method: "POST",
    body: JSON.stringify(payload)
  };
  request("places/search", options)
    .then(json => dispatch(fetchPlacesResponse(json)))
    .catch(error => dispatch(fetchPlacesError(error)));
};

export const setPlace = payload => ({
  type: GEO_SET_PLACE,
  payload
});

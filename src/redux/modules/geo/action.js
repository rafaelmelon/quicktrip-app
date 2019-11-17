import {
  GEO_SET_INITIAL_POSITION,
  GEO_SET_INITIAL_POSITION_ERROR,
  GEO_SET_CURRENT_POSITION
} from "./constant";

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

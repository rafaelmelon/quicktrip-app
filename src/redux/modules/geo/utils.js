import {
  STATE_GEO_CURRENT_POSITION,
  STATE_GEO_LATITUDE,
  STATE_GEO_LONGITUDE
} from "./constant";

export const setCurrentPosition = (state, payload) =>
  state
    .setIn([STATE_GEO_CURRENT_POSITION, STATE_GEO_LATITUDE], payload.latitude)
    .setIn(
      [STATE_GEO_CURRENT_POSITION, STATE_GEO_LONGITUDE],
      payload.longitude
    );

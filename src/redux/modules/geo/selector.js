import {
  STATE_GEO,
  STATE_GEO_INITIAL_POSITION,
  STATE_GEO_INITIAL_POSITION_ERROR,
  STATE_GEO_CURRENT_POSITION
} from "./constant";
import { selectorState } from "redux/utils";

export const selectorGeo = state => selectorState(state, STATE_GEO);

export const selectorInitialPosition = state =>
  selectorState(selectorGeo(state), STATE_GEO_INITIAL_POSITION);
export const selectorInitialPositionError = state =>
  selectorState(selectorGeo(state), STATE_GEO_INITIAL_POSITION_ERROR);
export const selectorCurrentPosition = state =>
  selectorState(selectorGeo(state), STATE_GEO_CURRENT_POSITION);

import { fromJS } from "immutable";

import {
  STATE_GEO_CURRENT_POSITION,
  STATE_GEO_LATITUDE,
  STATE_GEO_LONGITUDE,
  STATE_GEO_AUTOCOMPLETE,
  STATE_GEO_RESPONSE,
  STATE_GEO_CENTER,
  STATE_GEO_ERROR,
  STATE_GEO_FETCHING,
  STATE_GEO_PLACE,
  STATE_GEO_PLACES
} from "./constant";

export const initialState = fromJS({
  [STATE_GEO_CURRENT_POSITION]: {
    [STATE_GEO_LATITUDE]: 0,
    [STATE_GEO_LONGITUDE]: 0,
    [STATE_GEO_ERROR]: null
  },
  [STATE_GEO_AUTOCOMPLETE]: {
    [STATE_GEO_RESPONSE]: [],
    [STATE_GEO_FETCHING]: false,
    [STATE_GEO_ERROR]: null
  },
  [STATE_GEO_PLACES]: {
    [STATE_GEO_RESPONSE]: [],
    [STATE_GEO_FETCHING]: false,
    [STATE_GEO_ERROR]: null,
    [STATE_GEO_CENTER]: {}
  },
  [STATE_GEO_PLACE]: {}
});

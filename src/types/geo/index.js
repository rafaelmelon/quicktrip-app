import { shape, number, string, arrayOf, oneOfType, func } from "prop-types";

export const positionType = shape({
  latitude: number,
  longitude: number
});

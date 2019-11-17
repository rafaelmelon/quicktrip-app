import { API_QUICKTRIP_DEV, API_QUICKTRIP_PROD } from "constants/api";

const LOCAL_DOMAINS = ["localhost", "127.0.0.1", ""];

const API = LOCAL_DOMAINS.includes(window.location.hostname)
  ? API_QUICKTRIP_DEV
  : API_QUICKTRIP_PROD;

export const request = (path, options = {}) => {
  const url = `${API}/${path}`;

  return fetch(url).then(response => response.json());
};

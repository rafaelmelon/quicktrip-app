import { API_QUICKTRIP_DEV, API_QUICKTRIP_PROD } from "constants/api";

const LOCAL_DOMAINS = ["localhost", "127.0.0.1", ""];

const API = LOCAL_DOMAINS.includes(window.location.hostname)
  ? API_QUICKTRIP_DEV
  : API_QUICKTRIP_PROD;

export const request = (path, options = {}) => {
  const url = `${API}/${path}`;
  const settings = {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    ...options
  };

  return fetch(url, settings).then(response => response.json());
};

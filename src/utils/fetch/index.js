import { API_QUICKTRIP_DEV, API_QUICKTRIP_PROD } from "constants/api";

const LOCAL_DOMAINS = ["localhost", "127.0.0.1", ""];

const API = LOCAL_DOMAINS.includes(window.location.hostname)
  ? API_QUICKTRIP_DEV
  : API_QUICKTRIP_PROD;

export const request = (url, options = {}) => {
  const settings = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    ...options
  };

  return fetch(`${API}/${url}`, settings).then(response => {
    return response.json();
  });
};

export const requestJSON = (url, options = {}) => {
  const settings = {
    headers: {},
    ...options
  };

  return fetch(`${API}/${url}`, settings).then(response => {
    return response.json();
  });
};

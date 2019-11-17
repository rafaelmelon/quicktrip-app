import { API_QUICKTRIP_DEV, API_QUICKTRIP_PROD } from "constants/api";

const LOCAL_DOMAINS = ["localhost", "127.0.0.1", ""];

const API = LOCAL_DOMAINS.includes(window.location.hostname)
  ? API_QUICKTRIP_DEV
  : API_QUICKTRIP_PROD;

export const request = (url, options = {}) => {
  const headers = new Headers();
  const settings = {
    method: "GET",
    headers,
    mode: "cors",
    cache: "default",
    ...options
  };

  return fetch(`${API}/${url}`, settings).then(response => {
    return response.json();
  });
};

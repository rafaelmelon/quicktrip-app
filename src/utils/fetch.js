export const request = (url, options = {}) => {
  const settings = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    ...options
  };

  return fetch(url, settings).then(response => {
    return response.json();
  });
};

export const requestJSON = (url, options = {}) => {
  const settings = {
    headers: {},
    ...options
  };

  return fetch(url, settings).then(response => {
    return response.json();
  });
};

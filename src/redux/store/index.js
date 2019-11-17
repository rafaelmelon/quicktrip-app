import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import reduxThunk from "redux-thunk";
import { Map } from "immutable";

import { rootReducer } from "../modules";

export const configureStore = (initialState = Map()) => {
  let middleware;

  if (process.env.NODE_ENV !== "production") {
    const logger = createLogger({ collapsed: true });
    middleware = composeWithDevTools(applyMiddleware(reduxThunk, logger));
  } else {
    middleware = applyMiddleware(reduxThunk);
  }
  const store = createStore(rootReducer, initialState, middleware);

  return {
    store
  };
};

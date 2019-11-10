import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import reduxThunk from "redux-thunk";

import { rootReducer } from "../modules";

export const configureStore = () => {
  let middleware;

  if (process.env.NODE_ENV !== "production") {
    const logger = createLogger({ collapsed: true });
    middleware = composeWithDevTools(applyMiddleware(reduxThunk, logger));
  } else {
    middleware = applyMiddleware(reduxThunk);
  }
  const store = createStore(rootReducer, {}, middleware);

  return {
    store
  };
};

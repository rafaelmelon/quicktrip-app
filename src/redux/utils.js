export const selectorState = (state, path, defaultValue) =>
  state.get(path, defaultValue);

export const createReducer = (initialState, reducers) => {
  return (state = initialState, action) => {
    const reducer = reducers[action.type];
    if (typeof reducer === "function") {
      return reducer(state, action);
    }
    return state;
  };
};

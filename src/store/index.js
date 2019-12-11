// import React, { createContext, useReducer } from "react";

// const allData = new Array(25).fill(0).map((_val, i) => i + 1);
// const perPage = 10;
// const types = {
//   start: "START",
//   loaded: "LOADED"
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case types.start:
//       return { ...state, loading: true };
//     case types.loaded:
//       return {
//         ...state,
//         loading: false,
//         data: [...state.data, ...action.newData],
//         more: action.newData.length === perPage,
//         after: state.after + action.newData.length
//       };
//     default:
//       throw new Error("Don't understand action");
//   }
// };

// export const StoreContext = createContext();

// export const StoreProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, {
//     loading: false,
//     more: true,
//     data: [],
//     after: 0
//   });
//   const { loading, data, after, more } = state;

//   const load = () => {
//     dispatch({ type: types.start });

//     setTimeout(() => {
//       const newData = allData.slice(after, after + perPage);
//       dispatch({ type: types.loaded, newData });
//     }, 300);
//   };

//   return (
//     <StoreContext.Provider value={{ loading, data, more, load }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

import React, { createContext, useReducer } from "react";

const initialState = {
  loading: false,
  more: true,
  data: [],
  after: 0
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "action description":
        return state;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

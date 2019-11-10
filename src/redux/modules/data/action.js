export const DATA_CREATE_REDUX_FORM = "DATA_CREATE_REDUX_FORM";
export const DATA_CREATING_REDUX_FORM = "DATA_CREATING_REDUX_FORM";
export const DATA_REMOVE_REDUX_FORM = "DATA_REMOVE_REDUX_FORM";

export const DATA_CREATE_REACT_FINAL_FORM = "DATA_CREATE_REACT_FINAL_FORM";
export const DATA_CREATING_REACT_FINAL_FORM = "DATA_CREATING_REACT_FINAL_FORM";
export const DATA_REMOVE_REACT_FINAL_FORM = "DATA_REMOVE_REACT_FINAL_FORM";

export const createArray = payload =>
  new Promise((resolve, reject) => {
    const arr = [];
    const len = payload || 25;

    for (let i = 0; i < len; i++) {
      arr.push({
        id: i
      });
    }
    resolve(arr);
  });

export const creatingDataReduxForm = () => ({
  type: DATA_CREATING_REDUX_FORM
});

export const createDataReduxForm = payload => dispatch => {
  dispatch(creatingDataReduxForm());

  return createArray(payload).then(payload => {
    dispatch({
      type: DATA_CREATE_REDUX_FORM,
      payload
    });
  });
};

export const removeDataReduxForm = () => ({
  type: DATA_REMOVE_REDUX_FORM
});

export const creatingDataReactFinalForm = () => ({
  type: DATA_CREATING_REACT_FINAL_FORM
});

export const createDataReactFinalForm = payload => dispatch => {
  dispatch(creatingDataReactFinalForm());

  return createArray(payload).then(payload => {
    dispatch({
      type: DATA_CREATE_REACT_FINAL_FORM,
      payload
    });
  });
};

export const removeDataReactFinalForm = () => ({
  type: DATA_REMOVE_REACT_FINAL_FORM
});

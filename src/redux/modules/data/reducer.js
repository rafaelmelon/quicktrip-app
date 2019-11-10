import {
  DATA_CREATE_REDUX_FORM,
  DATA_CREATING_REDUX_FORM,
  DATA_REMOVE_REDUX_FORM,
  DATA_CREATE_REACT_FINAL_FORM,
  DATA_CREATING_REACT_FINAL_FORM,
  DATA_REMOVE_REACT_FINAL_FORM
} from "./action";

const initialState = {
  reduxForm: {
    dataArray: null,
    creating: false
  },
  reactFinalForm: {
    dataArray: null,
    creating: false
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_CREATE_REDUX_FORM: {
      return {
        ...state,
        reduxForm: {
          dataArray: action.payload,
          creating: false
        }
      };
    }
    case DATA_CREATING_REDUX_FORM: {
      return {
        ...state,
        reduxForm: {
          ...state.reduxForm,
          creating: false
        }
      };
    }
    case DATA_REMOVE_REDUX_FORM: {
      return {
        ...state,
        reduxForm: {
          dataArray: null,
          creating: false
        }
      };
    }
    case DATA_CREATE_REACT_FINAL_FORM: {
      return {
        ...state,
        reactFinalForm: {
          dataArray: action.payload,
          creating: false
        }
      };
    }
    case DATA_CREATING_REACT_FINAL_FORM: {
      return {
        ...state,
        reactFinalForm: {
          ...state.reactFinalForm,
          creating: false
        }
      };
    }
    case DATA_REMOVE_REACT_FINAL_FORM: {
      return {
        ...state,
        reactFinalForm: {
          dataArray: null,
          creating: false
        }
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as dataReducer };

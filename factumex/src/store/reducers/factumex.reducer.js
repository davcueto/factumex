import {
  ACCESS_TOKEN,
  LOG_OUT
} from "../actions/factumex.actions";

const initialState = {
  access_token: "",
};

const factumexReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case ACCESS_TOKEN:
      return {
        ...currentState,
        access_token: action.payload,
      };
    case LOG_OUT:
      return initialState;
    default:
      return currentState;
  }
};

export default factumexReducer;

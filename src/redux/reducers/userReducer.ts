// src/redux/reducers/userReducer.ts

type Action = {
  type: string;
  payload?: any;
};

const initialState = null;

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;

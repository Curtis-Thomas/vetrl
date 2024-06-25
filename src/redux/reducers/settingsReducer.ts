// src/redux/reducers/settingsReducer.ts

type UserSettings = {
  surgeryName: string;
  surgeryAddressNoStreet: string;
  surgeryAddressArea: string;
  surgeryAddressPostCode: string;
  surgeryAddressCountry: string;
  surgeryAddressPhoneNo: string;
  businessId: string;
  currency: string;
};

const initialState: UserSettings = {
  surgeryName: "_____",
  surgeryAddressNoStreet: "_____",
  surgeryAddressArea: "_____",
  surgeryAddressPostCode: "_____",
  surgeryAddressCountry: "_____",
  surgeryAddressPhoneNo: "_____",
  businessId: "_____",
  currency: "€",
};

const settingsReducer = (
  state = initialState,
  action: { type: string; payload?: UserSettings }
) => {
  switch (action.type) {
    case "SET_USER_SETTINGS":
      return { ...state, ...action.payload };
    case "RESET_USER_SETTINGS":
      return initialState;
    default:
      return state;
  }
};

export default settingsReducer;

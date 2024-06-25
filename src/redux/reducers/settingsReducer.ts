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
  surgeryName: "--Visit settings to set your surgery name--",
  surgeryAddressNoStreet: "--Visit settings to set your surgery address--",
  surgeryAddressArea: "--Visit settings to set your surgery area--",
  surgeryAddressPostCode: "--Visit settings to set your surgery post code--",
  surgeryAddressCountry: "--Visit settings to set your surgery country--",
  surgeryAddressPhoneNo: "--Visit settings to set your surgery phone number--",
  businessId: "--Visit settings to set your business ID--",
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

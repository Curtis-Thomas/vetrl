// src/redux/actions/settingsActions.ts

export type UserSettings = {
  surgeryName: string;
  surgeryAddressNoStreet: string;
  surgeryAddressArea: string;
  surgeryAddressPostCode: string;
  surgeryAddressCountry: string;
  surgeryAddressPhoneNo: string;
  businessId: string;

  weightUnit: string;
  distanceUnit: string;
  currency: string;
  pricePerKmMile: number;
};

export const setUserSettings = (settings: UserSettings) => ({
  type: "SET_USER_SETTINGS",
  payload: settings,
});

export const resetUserSettings = () => ({
  type: "RESET_USER_SETTINGS",
});

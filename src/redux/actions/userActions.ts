// src/redux/actions/userActions.ts
type User = {
  id: string;
  name: string;
};

export const setUser = (user: User) => ({
  type: "SET_USER",
  payload: user,
});

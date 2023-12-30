import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
};

const getUserInfoFromCookie = (): User | null => {
  const userCookie = Cookies.get("currentUser");
  if (userCookie) {
    return JSON.parse(userCookie);
  }
  return null;
};

const initialState: User = getUserInfoFromCookie() || {
  _id: "",
  firstName: "",
  lastName: "",
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      const { _id, firstName, lastName, role } = action.payload;
      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.role = role;

      Cookies.set("currentUser", JSON.stringify(action.payload), {
        expires: 30,
      });
    },

    clearCredentials: (state) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.role = "";

      Cookies.remove("currentUser");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

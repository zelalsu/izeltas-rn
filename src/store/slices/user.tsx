import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type
import {
  UserInfoParams,
  UserSessionInfoParams,
  UserSliceParams,
} from "../types";

const initialState: UserSliceParams = {
  userInfo: {
    user: {
      id: "",
      status: true,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      birthdate: "",
      gender: 0,
    },
  },

  userSessionInfo: {
    token: "",
  },
  remember_me: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (
      state: UserSliceParams,
      action: PayloadAction<UserInfoParams>
    ) => {
      state.userInfo = action.payload;
    },
    setUserSessionInfo: (
      state: UserSliceParams,
      action: PayloadAction<UserSessionInfoParams>
    ) => {
      state.userSessionInfo = action.payload;
    },
    setUserRemember: (
      state: UserSliceParams,
      action: PayloadAction<boolean>
    ) => {
      state.remember_me = action.payload;
    },
    setUserInitialState: () => {
      return initialState;
    },
  },
});

export const {
  setUserInfo,
  setUserSessionInfo,
  setUserRemember,
  setUserInitialState,
} = userSlice.actions;
export default userSlice.reducer;

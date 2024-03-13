import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailLogin: "",
  otp_token: "",
};

export const LoginSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    changeEmailLogin: (state, action) => {
      state.emailLogin = action.payload.emailLogin;
    },
    changeOTPToken: (state, action) => {
      state.otp_token = action.payload.otp_token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeEmailLogin, changeOTPToken } = LoginSlice.actions;

export default LoginSlice.reducer;

import {
  PROVIDER_GET,
  PROVIDER_POST,
  PROVIDER_PUT,
  PROVIDER_PUT_WITH_PARAMS,
} from "../provider";

export const loginUser = async (data) => {
  const response = await PROVIDER_POST(`login`, data);
  return response;
};

export const registerUser = async (data) => {
  const response = await PROVIDER_POST(`register`, data);
  return response;
};

export const forgotPassword = async (data) => {
  const response = await PROVIDER_PUT(`forgotPassword`, data);
  return response;
};

export const resetPassword = async (data, params) => {
  const response = await PROVIDER_PUT_WITH_PARAMS(
    `resetPassword`,
    data,
    params
  );
  return response;
};

export const verifyOTP = async (data, token) => {
  const response = await PROVIDER_PUT(`verifyOtp`, data, token);
  return response;
};

export const refreshOTP = async (data, token) => {
  const response = await PROVIDER_PUT(`refreshOtp`, data, token);
  return response;
};

export const refreshToken = async () => {
  const response = await PROVIDER_GET(`refreshToken`);
  console.log("yahahahaha");
  return response;
};

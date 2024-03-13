import { PROVIDER_POST, PROVIDER_PUT } from "../provider";

export const loginUser = async (data) => {
  const response = await PROVIDER_POST(`login`, data);
  return response;
};

export const registerUser = async (data) => {
  const response = await PROVIDER_POST(`register`, data);
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
